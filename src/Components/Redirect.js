import { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Server from "./APIUrl";
import Loader from "./Loader";
import Swal from "sweetalert2";
const Redirect = () => {
  const { accessToken } = useParams();
  const history = useHistory();
  const [loading, setLoading] = useState(true);
  const requestTime = new Date()
    .toISOString()
    .replaceAll("T", " ")
    .replaceAll("Z", "");

  useEffect(() => {
    return getOperator(accessToken);
  }, []);

  const getOperator = async (accessToken) => {
    setLoading(true);
   try{
    await Server.get(
      `/account/verifyToken?accessToken=${accessToken}&requestTime=${requestTime}`,
      {
        headers: {
          "content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "*",
        },
      }
    )
      .then( (response) => {

        if (response.data.resultCode === 0) {
          sessionStorage.setItem("jwtToken", response.data.resultData.jwtToken);
          sessionStorage.setItem(
            "userId",
            response.data.resultData.operatorid
          );
          sessionStorage.setItem(
            "accountId",
            response.data.resultData.accountid
          );
          sessionStorage.setItem(
            "name",
            response.data.resultData.name
          );
          sessionStorage.setItem(
            "emailId",
            response.data.resultData.emailid
          );
          sessionStorage.setItem(
            "phoneNo",
            response.data.resultData.phone
          );
          history.push("/AxiomProtect/DashBoard");
        }
        if(response.data.resultCode == -92){
            Swal.fire({
              title: 'Error',
              text: response.data.resultMessage,
              icon: 'error',
          })

        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
   }catch(err){
     console.log({err})
   }
  };

  return <>{loading && <Loader loading={loading} />}</>;
};

export default Redirect;
