import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';

function ClaimReimbursement() {
  const [cards, setCards] = useState([
    { id: 1, title: "Business Trip", estimatedAmount: "2000" },
    { id: 2, title: "Dinner Meeting", estimatedAmount: "150" },
    { id: 3, title: "Hotel Stay", estimatedAmount: "350" },
    { id: 4, title: "Office Supplies", estimatedAmount: "75" },
    { id: 5, title: "Team Lunch", estimatedAmount: "120" },
  ]);

  const [forms, setForms] = useState([]);

  const addForm = () => {
    const formId = Date.now();
    setForms([
      ...forms,
      {
        formId,
        title: "Sample Title",
        estimatedAmount: "100",
      },
    ]);
  };

  return (
    <>
      <h4 style={{ position: 'absolute', top: '2.65em', left: '8.5em', fontFamily: 'Bebas Neue, sans-serif', fontSize: '27px' }}>Claim Reimbursement</h4>
      <Box sx={{ '& button': { m: 1 } }}>
        <div>
          <Button variant="contained" size="small" style={{ position: 'absolute', top: '7.2em', left: '35em', width: '13em' }}>
            Submit All Expenses
          </Button>
        </div>
      </Box>
      <div style={{ display: 'flex', height: '90vh' }}>
        <div style={{ width: '25vw', overflowY: 'scroll', border: '1px solid #ccc', marginTop: '1em', height: '90%', marginLeft: '-1.4em' }}>
          {cards.map((card) => (
            <Card key={card.id} style={{ padding: '10px', borderBottom: '1px solid #ccc', height: '30%' }}>
              <p style={{fontSize:'x-large',position:'relative',left:'-2.7em'}}>Title: {card.title}</p>
              <p style={{fontSize:'x-large',position:'relative',left:'1git em'}}>Estimated Amount: ${card.estimatedAmount}</p>
              <Stack direction="row" spacing={2}>
                <Button onClick={addForm} variant="outlined" style={{ position: 'relative', top: '0.4em', left: '5.7em' }}>Claim Expense</Button>
              </Stack>
            </Card>
          ))}
        </div>
        <div style={{ width: '70vw', padding: '20px', overflowY: 'scroll' }}>
          {forms.map((form, index) => (
            <Form key={form.formId} showPlusButton={index === forms.length - 1} addForm={addForm} />
          ))}
        </div>
      </div>
    </>
  );
}

function Form({ key, showPlusButton, addForm }) {
  const top100Films = [
    { label: 'Travel Expense' },
    { label: 'Food Expense' },
    { label: 'Accommodation Expense' },
    { label: 'Purchase Expense' },
  ];
  const currencies = [
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
    },
  ];

  return (
    <div key={key} style={{ width: '71%', marginBottom: '20px', padding: '10px', border: '1px solid #ccc', marginTop: '0.55em', height: '40%' }}>
      <form>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={top100Films}
          sx={{ width: 250 }}
          style={{ position: 'relative', top: '0.5em', left: '0.4em' }}
          renderInput={(params) => <TextField {...params} label="Expense Type" />}
        />
        <TextField
          id="standard-basic"
          label="Amount"
          variant="standard"
          value="100"
          sx={{
            '&.Mui-focused': {
              '& .MuiInput-underline:before': {
                borderBottom: 'none !important',
              },
            },
          }}
          style={{ width: '05em', position: 'relative', marginLeft: '9em', top: '-1.3em', textDecoration: 'none' }}
        />
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '2ch', height: '1ch', position: 'relative', top: '-2.65em', left: '1em' },
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
              style={{ position: 'relative', marginLeft: '-8.27em', width: '5.55em', top: '-2.2em' }}
            />
          </Box>
        </div>
        <div style={{ position: 'relative', marginLeft: '9em', top: '-4.5em' }}>
          <Button variant="contained" style={{ width: '11em', position: 'relative', left: '-8.5em', top: '-1.4em' }} onClick={addForm}>
            Add Expense
          </Button>
          <Stack spacing={2} direction="row" />
        </div>
      </form>
    </div>
  );
}

export default ClaimReimbursement;
