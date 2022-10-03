import { LoadingButton } from "@mui/lab";
import {
  DataGrid
} from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Server from "../../../../APIUrl";
import Loader from "../../../../Loader";

import {
  Box, Button, Container, Divider, Grid, MenuItem, Modal, Select, TextField, Typography
} from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  // height: 800,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  fontFamily: "Jost",
};

export default function Resources() {
  const { clientId } = useParams();
  const authToken = sessionStorage.getItem("jwtToken");

  const [resourcesList, setResourcesList] = useState([]);
  const columns = [
    {
      field: "resourceName",
      headerName: "Resource Name",
      flex: 1,
      width: 80,
      headerClassName: "bg-color",
    },
    {
      field: "resourceIndicator",
      headerName: "Resource URL",
      sortable: false,
      flex: 2,
      width: 80,
      headerClassName: "bg-color",
    },
    {
      field: "scope",
      headerName: "Scopes",
      sortable: false,
      flex: 1,
      width: 80,
      headerClassName: "bg-color",
    },
    {
      field: "accessTokenFormat",
      headerName: "Token Format",
      sortable: false,
      flex: 1,
      width: 80,
      headerClassName: "bg-color",
    },
    {
      field: "accessTokenTTL",
      headerName: "Token TTL",
      sortable: false,
      flex: 1,
      width: 80,
      headerClassName: "bg-color",
    },
    {
      field: "createdAt",
      headerName: "Created On",
      sortable: true,
      width: 80,
      flex: 1,
      headerClassName: "bg-color",
      renderCell: (params) => new Date(params.value).toDateString(),
    },
  ];
  useEffect(() => {
    if (clientId) {
      handleGetResourcesList();
    }
  }, [clientId]);
  const handleGetResourcesList = async () => {
    setLoading(true);
    try {
      const res = await Server.get(`/oidc/getAllResources?id=${clientId}`, {
        headers: {
          "content-type": "application/json",
          authToken: authToken,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
      });
      setLoading(false);
      if (res?.data?.resultCode === 0) {
        const data = JSON?.parse(
          res?.data?.resultData || res?.data?.resultMessage || ""
        );
        if (data) {
          setResourcesList(data);
        }
      } else {
        Swal.fire("Error", res.data?.resultMessage, "error");
      }
    } catch (error) {
      setLoading(false);
      Swal.fire(
        "Error",
        error?.response?.data?.resultMessage || error?.message || error,
        "error"
      );

      console.log(error);
    }
  };
  const [open, setOpen] = React.useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [createResource, setCreateResource] = useState({ clientId });
  const saveState = (e) => {
    setCreateResource({ ...createResource, [e.target.name]: e.target.value });
  };
  const [loading, setLoading] = useState(false);
  const handleAddResource = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await Server.post(
        `/oidc/createResource`,
        createResource,
        {
          headers: {
            "content-type": "application/json",
            authToken: authToken,
          },
        }
      );
      if (response.data.resultCode === 0) {
        setLoading(false);
        handleGetResourcesList();
        handleCloseModal();
      } else {
        setLoading(false);
        handleCloseModal();
        Swal.fire({
          title: response.data.resultMessage,
          icon: "error",
          showCancelButton: false,
        });
      }
    } catch (error) {
      setLoading(false);
      Swal.fire(
        "Error",
        error?.response?.data?.resultMessage || error?.message || error,
        "error"
      );
    }
  };
  console.log({ resourcesList });

  return (
    <div>
      <div>
        <Button
          variant="contained"
          sx={{
            fontFamily: "Jost",
            float: "right",
            textTransform: "capitalize",
          }}
          onClick={handleOpenModal}
        >
          Add New Resource
        </Button>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <div style={{ width: "calc(90vw - 160px)" }}>
          <Box
            sx={{
              height: 300,
              width: "100%",
              "& .bg-color": {
                backgroundColor: "#0D4990",
                color: "#fff",
              },
            }}
          >
            <DataGrid
              style={{ width: "100%", height: 500 }}
              rows={resourcesList || []}
              columns={columns}
              pageSize={5}
              disableSelectionOnClick
              getRowId={(row) => row?.resourceId}
            />
          </Box>
        </div>
      )}
      <Modal
        open={open}
        // onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {/* <Form onSubmit={this.handleSubmit}> */}
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h6"
            sx={{ fontFamily: "Jost" }}
          >
            Add New Resource
          </Typography>
          <br />
          <Divider sx={{ borderColor: "#CECECE" }} />
          <br />
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                  Resource Name
                </Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="resourceName"
                  id="resourceName"
                  label="Resource Name"
                  variant="outlined"
                  onChange={saveState}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                  Resource URL
                </Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="resourceIndicator"
                  id="resourceIndicator"
                  label="Resource URL"
                  variant="outlined"
                  onChange={saveState}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                  Access Token Format
                </Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <Select
                  fullWidth
                  size="small"
                  // value={radiusSettings. radiusClientAuthtype}
                  name="accessTokenFormat"
                  id="accessTokenFormat"
                  onChange={saveState}
                >
                  <MenuItem value={"opaque"}>Opaque</MenuItem>
                  <MenuItem value={"jwt"}>JWT</MenuItem>
                </Select>
              </Grid>

              <Grid item xs={12} md={3}>
                <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                  Scopes
                </Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="scope"
                  id="scope"
                  label="Scopes"
                  variant="outlined"
                  onChange={saveState}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Typography sx={{ fontFamily: "Jost", color: "#232E3C" }}>
                  Token TTL (in Sec)
                </Typography>
              </Grid>
              <Grid item xs={12} md={9}>
                <TextField
                  fullWidth
                  size="small"
                  type="text"
                  name="accessTokenTTL"
                  id="accessTokenTTL"
                  label="Token TTL (in Sec)"
                  variant="outlined"
                  onChange={saveState}
                />
              </Grid>
            </Grid>
          </Container>
          <br />
          <Divider sx={{ borderColor: "#BABABA" }} />
          <br />
          <Grid container spacing={4} sx={{ marginLeft: "65%" }}>
            <Grid item>
              <Button
                variant="text"
                sx={{ fontFamily: "Jost" }}
                onClick={handleCloseModal}
              >
                Cancle
              </Button>
            </Grid>
            <Grid item>
              <LoadingButton
                loading={loading}
                type="submit"
                variant="contained"
                sx={{ fontFamily: "Jost" }}
                onClick={handleAddResource}
              >
                Add Resource
              </LoadingButton>
            </Grid>
          </Grid>
          {/* </Form> */}
        </Box>
      </Modal>
    </div>
  );
}
