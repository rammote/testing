import { Dialog, DialogContent, Modal } from '@material-ui/core'
import React from 'react'

function EditSAMLModal({open,children}) {
  return (
    <Dialog
    open={open}
    // onClose={handleCloseModal}
    aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    ><DialogContent>
        
        {children}
        </DialogContent>
        </Dialog>
  )
}

export default EditSAMLModal