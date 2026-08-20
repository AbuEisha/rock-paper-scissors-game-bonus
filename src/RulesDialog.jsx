import { Box, Dialog, DialogTitle, IconButton } from "@mui/material";

import closeIcon from "./assets/images/icon-close.svg";
import rulesImg from "./assets/images/image-rules-bonus.svg";
export default function RulesDialog({ open, handleClose }) {
  return (
    <Dialog
      open={open}
      aria-labelledby="rules-dialog-title"
      aria-describedby="rules-dialog-description"
      role="rulesdialog"
      sx={{
        "& .MuiPaper-root": {
          width: { sm: "400px" },
          flexDirection: { sm: "row" },
          rowGap: { sm: "1.5rem" },
          flexWrap: { sm: "wrap" },
          alignItems: "center",
          justifyContent: "space-between",
          margin: "0",
          padding: { xs: "6.25rem 2rem 4.25rem", sm: "40px 32px" },
          borderRadius: { xs: 0, sm: "8px" },
          maxHeight: { xs: "100%", sm: "auto" },
          height: { xs: "100%", sm: "auto" },
        },
      }}
    >
      <DialogTitle
        id="rules-dialog-title"
        sx={{
          padding: 0,
          fontSize: "2rem",
          fontWeight: 700,
          color: "text.primary",
          lineHeight: 0.75,
          textTransform: "uppercase",
        }}
      >
        {"Rules"}
      </DialogTitle>
      <IconButton
        disableRipple
        aria-label="Close Rules Dialog"
        onClick={handleClose}
        sx={{ padding: 0, order: { xs: 3, sm: 2 } }}
      >
        <Box component="img" src={closeIcon} alt="Close Icon" />
      </IconButton>

      <Box sx={{ width: "100%", order: { xs: 2, sm: 3 } }}>
        <Box
          component="img"
          src={rulesImg}
          alt="Rules Image"
          sx={{ maxWidth: "100%" }}
        />
      </Box>
    </Dialog>
  );
}
