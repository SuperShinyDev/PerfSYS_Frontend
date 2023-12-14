import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addOrder } from 'actions/order';
import { getFactories } from 'actions/factory';
import { getCustomers } from 'actions/customer';
import { getOwners } from 'actions/owner';
import { filterOrder } from 'actions/order';
import { Grid, Button, Box } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ShowAddDialog from './ShowAddDialog';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const addletter = 'Do you really add this items?';
const AddNew = ({ addOrder, getFactories, getCustomers, getOwners, filterOrder }) => {
  const { t } = useTranslation();
  const customers_state = useSelector((state) => state.customer.customers); // eslint-disable-line
  const factories_state = useSelector((state) => state.factory.factories); // eslint-disable-line
  const owners_state = useSelector((state) => state.owner.owners); // es
  const [customers, setCustomers] = React.useState(['']); // eslint-disable-line
  const [factories, setFactories] = React.useState(['']); // eslint-disable-line
  const [owners, setOwners] = React.useState(['']); // esl
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [formData, setFormData] = useState({
    orderPO: '',
    factory: '',
    customer: '',
    owner: '',
    completionDate: '',
    readyDate: '',
    qScore: '',
    cScore: '',
    pScore: ''
  });
  const { orderPO, factory, customer, owner, completionDate, readyDate } = formData;
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleChange_C = (newValue) => setFormData({ ...formData, completionDate: newValue });
  const handleChange_R = (newValue) => setFormData({ ...formData, readyDate: newValue });
  const handleOk = (e) => {
    e.preventDefault();
    addOrder(formData);
    handleClose();
  };
  React.useEffect(() => {
    getCustomers();
  }, [getCustomers]);
  React.useEffect(() => {
    setCustomers(customers_state);
  }, [customers_state]);
  React.useEffect(() => {
    getFactories();
  }, [getFactories]);
  React.useEffect(() => {
    setFactories(factories_state);
  }, [factories_state]);
  React.useEffect(() => {
    getOwners();
  }, [getOwners]);
  React.useEffect(() => {
    setOwners(owners_state);
  }, [owners_state]);
  //------------------Search order----------------------//
  const userID = useSelector((state) => state.auth.user);
  const [filter_order, setFilterOrder] = useState();
  const handleChangeSearch = (e) => {
    setFilterOrder(e.target.value);
  };
  const handleEnter = (event) => {
    if (event?.key !== 'Enter') {
      return;
    }
    console.log('userID', userID);
    filterOrder(filter_order, userID._id);
  };

  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75} marginTop="5px">
      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-between" rowSpacing={4.5}>
          <Grid item xs={12} md={12} lg={12}>
            <Grid container alignItems="center" justifyContent="space-around">
              <Grid item xs={12} md={12} lg={2}>
                <Button
                  variant="contained"
                  color="success"
                  sx={{ background: 'rgb(170,170,170)' }}
                  startIcon={<ShoppingBasketIcon />}
                  onClick={handleClickOpen}
                >
                  {t('AddNew')}
                </Button>
              </Grid>
              <Grid item xs={12} md={12} lg={10}>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                  <TextField
                    id="standard-search"
                    label={t('SearchOrder')}
                    type="search"
                    onChange={handleChangeSearch}
                    onKeyPress={handleEnter}
                    variant="standard"
                  ></TextField>
                  <SearchIcon sx={{ mr: 1, my: 0.5 }} />
                </Box>
              </Grid>
            </Grid>
            <ShowAddDialog
              open={open}
              handleClickOpen={handleClickOpen}
              handleClose={handleClose}
              content={t('AddLetter')}
              handleOk={handleOk}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={1}>
            <TextField
              id="outlined-search"
              label={`${t('EnterOrder')}`}
              type="search"
              name="orderPO"
              value={orderPO}
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ fontSize: '15px' }}>
                {t('SelectFactory')}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="factory"
                value={factory}
                label="Select Factory"
                onChange={handleChange}
              >
                {factories.map((factory_it) => {
                  return (
                    <MenuItem id={factory_it._id} value={factory_it.factory}>
                      {factory_it.factory}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={2}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ fontSize: '15px' }}>
                {t('SelectCustomer')}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="customer"
                value={customer}
                label="Select Customer"
                onChange={handleChange}
              >
                {customers.map((customer_it) => {
                  return (
                    <MenuItem id={customer_it._id} value={customer_it.customer}>
                      {customer_it.customer}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={12} lg={1}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ fontSize: '15px' }}>
                {t('SelectOwner')}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="owner"
                value={owner}
                label="Select Customer"
                onChange={handleChange}
              >
                {owners.map((owner_it) => {
                  return (
                    <MenuItem id={owner_it._id} value={owner_it.owner}>
                      {owner_it.owner}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid container item xs={12} md={3} lg={3} alignItems="center" justifyContent="Left">
            <Grid item xs={12} md={12} lg={5}>
              <div>{t('OrderCompletionDate')}</div>
            </Grid>
            <Grid item xs={12} md={12} lg={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker onChange={handleChange_C} value={completionDate} />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={2} lg={2} alignItems="center" justifyContent="Left">
            <Grid item xs={12} md={12} lg={3}>
              <div>{t('ReadyDate')}</div>
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker onChange={handleChange_R} value={readyDate} />
              </LocalizationProvider>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
AddNew.propTypes = {
  addOrder: PropTypes.func.isRequired,
  getFactories: PropTypes.func.isRequired,
  getCustomers: PropTypes.func.isRequired,
  getOwners: PropTypes.func.isRequired,
  filterOrder: PropTypes.func.isRequired
};
export default connect(null, { addOrder, getFactories, getCustomers, getOwners, filterOrder })(AddNew);
