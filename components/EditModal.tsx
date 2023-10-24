import React, { ChangeEvent } from "react";
import {
  Modal,
  Backdrop,
  Button,
  TextField,
  Typography,
  Alert,
} from "@mui/material";
import { UserType } from "./Table";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRow: UserType | null;
  handleFieldChange: (field: string, value: string) => void;
  handleSaveChanges: () => void;
  validInfo: { name: string; validInfo: string };
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function EditModal({
  isOpen,
  onClose,
  selectedRow,
  handleFieldChange,
  handleSaveChanges,
  validInfo,
}: EditModalProps) {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Box sx={style}>
        <form className="flex flex-col gap-7">
          <Typography variant="h5">Edit Row</Typography>
          <TextField
            label="Name"
            value={selectedRow?.name || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFieldChange("name", e.target.value)
            }
          />
          <TextField
            label="Email"
            value={selectedRow?.email || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFieldChange("email", e.target.value)
            }
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateField
              label="Controlled field"
              value={selectedRow?.birthday_date || ""}
              onChange={(newValue) =>
                handleFieldChange("birthday_date", newValue || "")
              }
            />
          </LocalizationProvider>
          {/* <TextField
            type="date"
            label="Birth date"
            value={selectedRow?.birthday_date || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFieldChange("birthday_date", e.target.value)
            }
          /> */}
          <TextField
            label="Phone number"
            value={selectedRow?.phone_number || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFieldChange("phone_number", e.target.value)
            }
          />
          <TextField
            label="address"
            value={selectedRow?.address || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleFieldChange("address", e.target.value)
            }
          />
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSaveChanges}
          >
            Save Changes
          </Button>
          {validInfo.validInfo.length > 0 && (
            <Alert severity="warning">{validInfo.validInfo}</Alert>
          )}
        </form>
      </Box>
    </Modal>
  );
}
