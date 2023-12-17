import React, { useEffect, useState } from 'react';
import { Grid, Button, InputLabel, MenuItem, FormControl, Select, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getFactories } from 'actions/factory';
import { getCustomers } from 'actions/customer';
import { getOwners } from 'actions/owner';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { getOrdersByPeriod } from 'actions/order';
import AnalysisTable from './AnalysisTable';
import ShowSnackbar from 'layout/Component/alert';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      maxwidth: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP
    }
  }
};
const OrderPage = ({ getCustomers, getOwners, getOrdersByPeriod, getFactories }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    factory: '',
    customer: '',
    owner: '',
    fromDate: '',
    toDate: ''
  });
  const alertInfo = useSelector((state) => state.alert);
  const { factory, customer, owner, fromDate, toDate } = formData;
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleChange_f = (newValue) => setFormData({ ...formData, fromDate: newValue });
  const handleChange_t = (newValue) => setFormData({ ...formData, toDate: newValue });
  const customers_state = useSelector((state) => state.customer.customers);
  const owners_state = useSelector((state) => state.owner.owners);
  const factories_state = useSelector((state) => state.factory.factories);
  const [factories, setFactories] = React.useState(['']);
  const [customers, setCustomers] = React.useState(['']);
  const [owners, setOwners] = React.useState(['']);
  const [category, setCategory] = React.useState('');
  const [disable, setDisable] = React.useState([false, false, false]);
  const handleCategoryChange = async (e) => {
    setCategory(e.target.value);
    if (e.target.value == 'factory') {
      setDisable([true, false, false]);
    } else if (e.target.value == 'customer') {
      setDisable([false, true, false]);
    } else if (e.target.value == 'owner') {
      setDisable([false, false, true]);
    }
  };
  React.useEffect(() => {
    getFactories();
  }, [getFactories]);
  React.useEffect(() => {
    setFactories(factories_state);
  }, [factories_state]);
  React.useEffect(() => {
    getCustomers();
  }, [getCustomers]);
  React.useEffect(() => {
    setCustomers(customers_state);
  }, [customers_state]);
  React.useEffect(() => {
    getOwners();
  }, [getOwners]);
  React.useEffect(() => {
    setOwners(owners_state);
  }, [owners_state]);
  const handleClickGetOrderByPeriod = async (formData, category) => {
    await getOrdersByPeriod(formData, category);
  };
  const orders_period_state = useSelector((state) => state.order.orders_period);
  const [orders_period, setOrders_Period] = React.useState(orders_period_state);
  React.useEffect(() => {
    setOrders_Period(orders_period_state);
  }, [orders_period_state]);
  return (
    <Grid container rowSpacing={4.5} columnSpacing={4.75} marginTop="5px" marginBottom="20px">
      <Grid item xs={12} md={12} lg={12} sx={{ paddingBottom: '20px' }}>
        <Grid container alignItems="center" justifyContent="space-around" rowSpacing={4.5}>
        <Typography variant="h3" color="rgb(150,150,150)" fontFamily="serif" align = "center" width = "85%">{t("AllOrdersByTwo")}</Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={12} sx={{ paddingBottom: '20px' }}>
        <Grid container alignItems="center" justifyContent="space-around" rowSpacing={4.5}>
          <Grid item xs={12} md={6} lg={1.5}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ fontSize: '15px' }}>
                {t('SelectIndex')}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="factory"
                value={category}
                MenuProps={MenuProps}
                label="Select Factory"
                onChange={handleCategoryChange}
              >
                <MenuItem id="factory" value="factory" style={{ fontSize: '20px' }}>
                  {t('Customer&Owner')}
                </MenuItem>
                <MenuItem id="customer" value="customer" style={{ fontSize: '20px' }}>
                  {t('Factory&Owner')}
                </MenuItem>
                <MenuItem id="owner" value="owner" style={{ fontSize: '20px' }}>
                  {t('Factory&Customer')}
                </MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6} lg={1.5}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ fontSize: '15px' }}>
                {t('SelectFactory')}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="factory"
                value={factory}
                disabled={disable[0]}
                MenuProps={MenuProps}
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
          <Grid item xs={12} md={6} lg={1.5}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ fontSize: '15px' }}>
                {t('SelectCustomer')}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="customer"
                value={customer}
                disabled={disable[1]}
                MenuProps={MenuProps}
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
          <Grid item xs={12} md={6} lg={1.5}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label" sx={{ fontSize: '15px' }}>
                {t('SelectOwner')}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                name="owner"
                value={owner}
                disabled={disable[2]}
                MenuProps={MenuProps}
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
          <Grid container item xs={12} md={2} lg={2} alignItems="center" justifyContent="Left">
            <Grid item xs={12} md={12} lg={3}>
              <div>{t('fromDate')}</div>
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker onChange={handleChange_f} value={fromDate} />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={2} lg={2} alignItems="center" justifyContent="Left">
            <Grid item xs={12} md={12} lg={3}>
              <div>{t('toDate')}</div>
            </Grid>
            <Grid item xs={12} md={12} lg={8}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker onChange={handleChange_t} value={toDate} />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} lg={1}>
            <Button
              variant="contained"
              sx={{ backgroundColor: 'rgb(200,200,200)' }}
              startIcon={<VisibilityIcon />}
              onClick={() => handleClickGetOrderByPeriod(formData, category)}
            >
              {t('ANALYSIS')}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container alignItems="center" justifyContent="space-around" rowSpacing={4.5}>
          <AnalysisTable data={orders_period} category={category} />
        </Grid>
      </Grid>
      <ShowSnackbar open={alertInfo[0]?.open} content={alertInfo[0]?.msg} type={alertInfo[0]?.alertType} />
    </Grid>
  );
};
OrderPage.propTypes = {
  getFactories: PropTypes.func.isRequired,
  getCustomers: PropTypes.func.isRequired,
  getOwners: PropTypes.func.isRequired,
  getOrdersByPeriod: PropTypes.func.isRequired
};
export default connect(null, {
  getFactories,
  getCustomers,
  getOwners,
  getOrdersByPeriod
})(OrderPage);
