import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { margin } from '@mui/system';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import HistoryIcon from '@mui/icons-material/History';
import { useMutation, useQuery, gql } from '@apollo/client';
import {CREATE_REIMBURSEMENT} from '../gqloperations/mutations'
import { GET_REIMBURSEMENTS } from '../gqloperations/mutations';



export const AddTravel = () => {
  const [request, setRequest] = useState({
    name: '',
    fromDate: '',
    toDate: '',
    amount: '',
    description: '',
    place: '',
  });

  const currencies = [
    ,
    {
      value: 'INR',
      label: '₹',
    },
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  };

  const [createReimbursement] = useMutation(CREATE_REIMBURSEMENT, {
    refetchQueries: [{ query: GET_REIMBURSEMENTS }],
  });

  const handleSubmit = () => {
    createReimbursement({ variables: { reimbursementNew: request } })
      .then(() => {
        // Data submitted successfully, you can perform any additional actions here
        setRequest({
          name: '',
          fromDate: '',
          toDate: '',
          description: '',
          place: '',
        });
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  const { loading, error, data } = useQuery(GET_REIMBURSEMENTS);

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const dataRows = data.reimbursements;


const top100Films = [
  { label: 'Travel Expense' },
  { label: 'Food Expense',},
  { label: 'Accomodation Expense', },
  { label: 'Purchase Expense', },
];

// const dataRows = [
//   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Approved'],
//   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Not Approved'],
//   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Approved'],
//   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Approved'],
//   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Approved'],
//   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Not Approved'],
//   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Not Approved'],
//   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Approved'],
//   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Not Approved'],
//   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Not Approved'],
//   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Approved'],
//   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Not Approved'],
//   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Approved'],
//   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Not Approved'],
//   ['Sample Name', '2023-10-15', '2023-10-20', 'Sample Description', 'Sample Place', 'Approved'],

//   // Add more data rows as needed
// ];

  

  return (
    <div style={styles.container}>
      <h2 style={styles.title} style={{fontFamily:'Bebas Neue,sans-serif',position:'absolute',top:'-0.7em',left:'8.5em'}}>Add Request</h2>
      <Autocomplete
      disablePortal
      id="combo-box-demo"
      maxRows={6}
      options={top100Films}
      sx={{ width: 250 }}
      style={{position:'absolute',left:'1.7em',top:'2.1em'}}
      renderInput={(params) => <TextField {...params} label="Expense Type" />}
    />
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div style={styles.formGroup}>
          <TextField
            id="outlined-multiline-flexible"
            label="Name of Request"
            multiline
            maxRows={4}
            onChange={handleInputChange}
            style={styles.input}
            style={{position:'absolute',left:'8em',width:'20vw',top:'1.9em'}}
          />
        </div>
      </Box>
      <div style={{ marginLeft: '15em',position:'absolute',top:'1.9em' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} pl={12}>
          <DemoContainer pl={12} components={['DatePicker']}>
            <DatePicker pl={12} style={{ padding: '5em' }} label="From Date" />
          </DemoContainer>
        </LocalizationProvider>
      </div>

      <div>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <div style={styles.input} style={{ position: 'absolute', marginLeft: '21em', top: '1.7em' }}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker label="To Date" />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        </Box>
      </div>

      <div>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={2}
            style={styles.input}
            style={{ position: 'absolute', marginLeft: '-13.27em', width: '5.55em', top: '4.2em' }}
          />
        </Box>
      </div>

      <TextField
        id="standard-basic"
        label="Place of Visit"
        variant="standard"
        style={styles.input}
        sx={{
          '&.Mui-focused': {
            '& .MuiInput-underline:before': {
              borderBottom: 'none !important',
            },
          },
        }}
        style={{ width: '06em', position: 'absolute', marginLeft: '-6.5em', top: '4.35em', textDecoration: 'none' }}
      />
       <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '2ch',height:'1ch',position:'absolute',top:'4.5em',left:'15.18em' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-select-currency"
          select
          defaultValue="INR"
        >
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        </div>
        </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <div>
          <FormControl fullWidth sx={{ m: 1 }} variant="standard">
            <Input
              id="standard-adornment-amount"
              startAdornment={<InputAdornment position="start"></InputAdornment>}
              style={styles.input} style={{ position: 'absolute', marginLeft: '49.5em', width: '9em', top: '11.85em' }}
            />
          </FormControl>
        </div>
      </Box>

      <Stack direction="row" spacing={4}>
        <Button variant="contained" style={{ position: 'absolute', marginLeft: '74em', width: '14em', top: '17.0em' }}>
          Submit
        </Button>
      </Stack>

      <HistoryIcon style={{position:'absolute',top:'14.3em',left:'3.5em',transform:'scale(1.5)'}} />

      <h4 style={{ position: 'absolute', left: '3.7em', top: '9.15em' , fontFamily:'Bebas Neue,sans-serif',fontSize:'xx-large',}}>Request History </h4>
      {/* Add a table here */}
      <div
        className="viewingdata"
        style={{
          position: 'absolute',
          top: '7.8em',
          width: '130vw', // Adjust width as needed
          marginLeft: '0', // Adjust left margin as needed
          overflowX: 'auto', // Horizontal scrollbar if content overflows
          maxHeight: '5.7em', // Set the maximum height for the table container
          marginLeft:'-4.7em'
        }}
      >
        <table style={styles.table}>
      <thead style={styles.tableHeader}>
        <tr>
          <th>Name</th>
          <th>From Date</th>
          <th>To Date</th>
          <th>Description</th>
          <th>Place of Visit</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody style={styles.tableData}>
        {dataRows.map((row, index) => (
          <tr key={index} style={{ color: row[5] === 'Approved' ? 'green' : 'black' }}>
            {row.map((item, itemIndex) => (
              <td key={itemIndex}>{item}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
      </div>
    </div>
  );
};

const styles = {
  container: {
    position:'relative',
    width:'30em',
    marginLeft:'-3.5em',
    padding: '16px',
    // border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    height:'20em'
  },
  title: {
    textAlign: 'center',
    color: '#007BFF',
    position:'relative',
    top:'-1.15em',
    left:'-2.2em'
  },
  formGroup: {
    margin: '10px 0',
  },
  label: {
    display: 'block',
    marginBottom: '5px',
    color: '#333',
  },
  input: {
    width:'08em',
    position:'absolute',
    left:'01.5em',
    
  },
  table: {
    width: '60%',
    borderCollapse: 'collapse',
    marginTop: '1em',
    marginLeft:'06em'
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    padding: '18px',
    fontSize:'x-small', // Adjust the font size as needed
    position: 'sticky',
    top: 0,
    zIndex: 1,
  },
  tableData: {
    padding: '8px',
    borderBottom: '1px solid #ddd',
    fontSize: 'small', // Adjust the font size as needed
  },
};

export default AddTravel;

// import React, { useState } from 'react';

// export const AddTravel = () => {
//   const [request, setRequest] = useState({
//     name: '',
//     fromDateDD: '',
//     fromDateMM: '',
//     fromDateYYYY: '',
//     toDateDD: '',
//     toDateMM: '',
//     toDateYYYY: '',
//     amount: '',
//     description: '',
//     place: '',
//   });

//   const handleDateInputChange = (e) => {
//     const { name, value } = e.target;

//     if (
//       (name.endsWith('DD') || name.endsWith('MM')) &&
//       (value.length > 2 || parseInt(value) > 31)
//     ) {
//       return; // Only allow up to 2 digits for day and month
//     }

//     if (name.endsWith('YYYY') && value.length > 4) {
//       return; // Only allow up to 4 digits for year
//     }

//     setRequest({ ...request, [name]: value });

//     if (name.endsWith('DD') && value.length === 2) {
//       document.getElementById(name.replace('DD', 'MM')).focus();
//     } else if (name.endsWith('MM') && value.length === 2) {
//       document.getElementById(name.replace('MM', 'YYYY')).focus();
//     }
//   };

//   return (
//     <div style={styles.pageContainer}>
//       <div style={styles.scrollableContent}>
//         <h2 style={styles.title}>Add Request</h2>
//         <div style={styles.formGroup}>
//           <label style={styles.label}>Name of the Request</label>
//           <input
//             type="text"
//             name="name"
//             placeholder="Name of the Request"
//             value={request.name}
//             onChange={(e) => setRequest({ ...request, name: e.target.value })}
//             style={styles.input}
//           />
//         </div>

//         <div style={styles.formGroup}>
//           <label style={styles.label}>From Date (DD-MM-YYYY)</label>
//           <div style={styles.dateInputContainer}>
//             <input
//               type="text"
//               name="fromDateDD"
//               placeholder="DD"
//               value={request.fromDateDD}
//               onChange={handleDateInputChange}
//               id="fromDateDD"
//               style={styles.dateInput}
//             />
//             <input
//               type="text"
//               name="fromDateMM"
//               placeholder="MM"
//               value={request.fromDateMM}
//               onChange={handleDateInputChange}
//               id="fromDateMM"
//               style={styles.dateInput}
//             />
//             <input
//               type="text"
//               name="fromDateYYYY"
//               placeholder="YYYY"
//               value={request.fromDateYYYY}
//               onChange={handleDateInputChange}
//               id="fromDateYYYY"
//               style={styles.dateInput}
//             />
//           </div>
//         </div>

//         <div style={styles.formGroup}>
//           <label style={styles.label}>To Date (DD-MM-YYYY)</label>
//           <div style={styles.dateInputContainer}>
//             <input
//               type="text"
//               name="toDateDD"
//               placeholder="DD"
//               value={request.toDateDD}
//               onChange={handleDateInputChange}
//               id="toDateDD"
//               style={styles.dateInput}
//             />
//             <input
//               type="text"
//               name="toDateMM"
//               placeholder="MM"
//               value={request.toDateMM}
//               onChange={handleDateInputChange}
//               id="toDateMM"
//               style={styles.dateInput}
//             />
//             <input
//               type="text"
//               name="toDateYYYY"
//               placeholder="YYYY"
//               value={request.toDateYYYY}
//               onChange={handleDateInputChange}
//               id="toDateYYYY"
//               style={styles.dateInput}
//             />
//           </div>
//         </div>

//         <div style={styles.formGroup}>
//           <label style={styles.label}>Approx Amount</label>
//           <input
//             type="text"
//             name="amount"
//             placeholder="Approx Amount"
//             value={request.amount}
//             onChange={(e) => setRequest({ ...request, amount: e.target.value })}
//             style={styles.input}
//           />
//         </div>

//         <div style={styles.formGroup}>
//           <label style={styles.label}>Description</label>
//           <textarea
//             name="description"
//             placeholder="Description"
//             value={request.description}
//             onChange={(e) => setRequest({ ...request, description: e.target.value })}
//             style={styles.textarea}
//           />
//         </div>

//         <div style={styles.formGroup}>
//           <label style={styles.label}>Place of Visit</label>
//           <input
//             type="text"
//             name="place"
//             placeholder="Place of Visit"
//             value={request.place}
//             onChange={(e) => setRequest({ ...request, place: e.target.value })}
//             style={styles.input}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// const styles = {
//   pageContainer: {
//     width: '200em',
//     height: '05em',
//     overflow: 'auto',
//   },
//   scrollableContent: {
//     width: '100%',
//     maxWidth: '400px',
//     margin: '0 auto',
//     padding: '20px',
//     border: '1px solid #ccc',
//     borderRadius: '8px',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//   },
//   title: {
//     textAlign: 'center',
//     color: '#007BFF',
//   },
//   formGroup: {
//     margin: '10px 0',
//   },
//   label: {
//     display: 'block',
//     marginBottom: '5px',
//     color: '#333',
//   },
//   input: {
//     width: '100%',
//     padding: '10px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     transition: 'border-color 0.3s',
//   },
//   textarea: {
//     width: '100%',
//     padding: '10px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     transition: 'border-color 0.3s',
//   },
//   dateInputContainer: {
//     display: 'flex',
//     gap: '5px',
//   },
//   dateInput: {
//     // width: '33%',
//     // padding: '10px',
//     // border: '1px solid #ccc',
//     // borderRadius: '5px',
//     // transition: 'border-color 0.3s',
//   },
// };

// export default AddTravel;


// import React, { useState } from 'react';

// export const AddTravel = () => {
//   const [request, setRequest] = useState({
//     name: '',
//     fromDate: '',
//     toDate: '',
//     amount: '',
//     description: '',
//     place: '',
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setRequest({ ...request, [name]: value });
//   };

//   return (
//     <div style={styles.container}>
//       <h2 style={styles.title}>Add Request</h2>
//       <div style={styles.formGroup}>
//         <label style={styles.label}>Name of the Request</label>
//         <input
//           type="text"
//           name="name"
//           placeholder="Name of the Request"
//           value={request.name}
//           onChange={handleInputChange}
//           style={styles.input}
//         />
//       </div>

//       <div style={styles.formGroup}>
//         <label style={styles.label}>From Date (DD-MM-YYYY)</label>
//         <input
//           type="text"
//           name="fromDate"
//           placeholder="DD-MM-YYYY"
//           value={request.fromDate}
//           onChange={handleInputChange}
//           style={styles.input}
//         />
//       </div>

//       <div style={styles.formGroup}>
//         <label style={styles.label}>To Date (DD-MM-YYYY)</label>
//         <input
//           type="text"
//           name="toDate"
//           placeholder="DD-MM-YYYY"
//           value={request.toDate}
//           onChange={handleInputChange}
//           style={styles.input}
//         />
//       </div>

//       <div style={styles.formGroup}>
//         <label style={styles.label}>Approx Amount</label>
//         <input
//           type="text"
//           name="amount"
//           placeholder="Approx Amount"
//           value={request.amount}
//           onChange={handleInputChange}
//           style={styles.input}
//         />
//       </div>

//       <div style={styles.formGroup}>
//         <label style={styles.label}>Description</label>
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={request.description}
//           onChange={handleInputChange}
//           style={styles.textarea}
//         />
//       </div>

//       <div style={styles.formGroup}>
//         <label style={styles.label}>Place of Visit</label>
//         <input
//           type="text"
//           name="place"
//           placeholder="Place of Visit"
//           value={request.place}
//           onChange={handleInputChange}
//           style={styles.input}
//         />
//       </div>
//     </div>
//   );
// };

// const styles = {
//   container: {
//     width: '83%',
//     maxWidth: '90%',
//     margin: '0em',
//     marginLeft:'-5em',
//     padding: '20px',
//     border: '1px solid #ccc',
//     borderRadius: '8px',
//     boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//     height:'13em',
//   },
//   title: {
//     textAlign: 'center',
//     color: '#007BFF',
//     position:'relative',
//     top:'-1em'
//   },
//   formGroup: {
//     // margin: '10px 0',
//   },
//   label: {
//     display: 'block',
//     // marginBottom: '5px',
//     color: '#333',
//     position:'relative',
//     top:'-2em',
//     textAlign:'left'
//   },
//   input: {
//     width: '60%',
//     padding: '5px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     transition: 'border-color 0.3s',
//     position:'relative',
//     top:'-2em',
//     ':hover': {
//       borderColor: '#007BFF',
//     },
//   },
//   textarea: {
//     width: '100%',
//     padding: '10px',
//     border: '1px solid #ccc',
//     borderRadius: '5px',
//     transition: 'border-color 0.3s',
//     ':hover': {
//       borderColor: '#007BFF',
//     },
//   },
// };

// export default AddTravel;
