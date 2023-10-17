import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useMutation, useQuery } from "@apollo/client"; // Import useQuery
import {
  GET_TEAM_MEMBERS,
  GET_PRE_REQUESTS,
  UPDATE_REIMBURSEMENTS,
} from "../gqloperations/mutations"; // Import your GraphQL query
import { tokens } from "../../src/theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "./Header";
import { ColorModeContext, useMode } from "../../src/theme";
import Button from "@mui/material/Button";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { useState } from "react";
import { Loader, Error } from "./loader";

const PreApproveRequest = () => {
  const [colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [selectionModel, setSelectionModel] = useState([]);

  const handleSelectionModelChange = (newSelection) => {
    console.log(
      "🚀 ~ file: preApproveRequests.jsx:25 ~ handleSelectionModelChange ~ newSelection:",
      newSelection
    );
    setSelectionModel(newSelection);
  };
  const { loading, error, data, refetch } = useQuery(GET_PRE_REQUESTS, {
    context: {
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
    },
  });

  const [updateReimbursements, { updateData, updateLoading, updateError }] =
    useMutation(UPDATE_REIMBURSEMENTS, {
      onCompleted: () => {
        refetch({
          // Additional fetch options
          context: {
            headers: {
              // Your custom headers here
              Authorization: `${localStorage.getItem("token")}`,
            },
          },
        });
      },
    });

  if (loading) return <Loader />;
  if (error) return <Error />;

  const handleBulkApproveSubmit = () => {
    updateReimbursements({
      context: {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      },
      variables: {
        reimbursementsUpdateInput: {
          ids: selectionModel,
          reimbursementInput: {
            isPreApproved: true,
          },
        },
      },
    });
  };

  const columns = [
    { field: "title", headerName: "Title", flex: 1 },
    {
      field: "description",
      headerName: "Description",
      flex: 0.7,
      cellClassName: "name-column--cell",
    },
    {
      field: "type",
      headerName: "Type",
      flex: 0.5,
      cellClassName: "name-column--cell",
    },
    {
      field: "by",
      headerName: "Requested By",
      flex: 1,
      renderCell: ({ row }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              row.role === "admin"
                ? colors.greenAccent[600]
                : row.role === "manager"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {row.by.firstName + " " + row.by.lastName}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {row.role}
            </Typography>
          </Box>
        );
      },
    },

    {
      field: "visitLocation",
      headerName: "Place",
      flex: 0.5,
    },
    {
      field: "fromDate",
      headerName: "From",
      flex: 0.7,
    },
    {
      field: "toDate",
      headerName: "To",
      flex: 0.7,
    },
    {
      field: "askedAmount",
      headerName: "Ask",
      flex: 1,
    },
  ];

  return (
    <>
      <Box
        style={{
          position: "absolute",
          bottom: "0px",
          left: "5em",
          right: "0px",
        }}
      >
        <div
          style={{
            // backgroundColor: colors.blueAccent[800],
            color: colors.blueAccent[200],
            width: "100%",
            top: "0px",
            zIndex: -1,
            flex: 1,
            height: "100%",
            display: "flex",
            textAlign: "center",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          className="banner"
        >
          <h4
            style={{
              marginLeft: 40,
              fontFamily: "Bebas Neue,sans-serif",
              fontSize: "xxx-large",
            }}
          >
            Pre Approval Requests
          </h4>
          <Button
            variant="contained"
            type="submit"
            onClick={() => {
              handleBulkApproveSubmit();
            }}
            style={{
              marginRight: 40,
              fontSize: "small",
              width: "10%",
              height: "50%",
            }}
          >
            Approve
          </Button>
        </div>
        <Box
          height="85vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid
            checkboxSelection
            onRowSelectionModelChange={(newRowSelectionModel) => {
              handleSelectionModelChange(newRowSelectionModel);
            }}
            rowSelectionModel={selectionModel}
            rows={data.pendingPreRequests}
            columns={columns}
            getRowId={(row) => row._id} // Replace '_id' with the actual unique identifier field
          />
        </Box>
      </Box>
    </>
  );
};

export default PreApproveRequest;
