import React from 'react';
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  makeStyles,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Typography,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import CoursesCard from './../components/CoursesCard';

const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
  loader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    marginBottom: '1rem',
    padding: '13px',
  },
  filters: {
    padding: '0 1.5rem',
  },
  priceRangeInputs: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  minMaxFilters: {
    margin: '0.8em',
    padding: '0.3em',
  },
  minFilter: {
    marginLeft: '0.3em',
  },
});

const CoursesPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();

  const params = location.search ? location.search : null;

  // component state
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sliderMax, setSliderMax] = useState(50);
  const [priceRange, setPriceRange] = useState([5, 50]);
  const [filter, setFilter] = useState('');
  const [priceOrder, setPriceOrder] = useState('descending');
  const [sorting, setSorting] = useState('');

  const updateUiValues = (uiValues) => {
    setSliderMax(uiValues.maxPrice);
    if (uiValues.filtering.price) {
      let priceFilter = uiValues.filtering.price;
      setPriceRange([Number(priceFilter.gte), Number(priceFilter.lte)]);
    }

    if (uiValues.sorting.price) {
      let priceSort = uiValues.sorting.price;
      setPriceOrder(priceSort);
    }
  };

  // side effects
  // load all data, when the component is rendered
  useEffect(() => {
    let cancel;

    const fetchData = async () => {
      setLoading(true);
      let query;
      try {
        if (params && !filter) {
          query = params;
        } else {
          query = filter;
        }

        if (sorting) {
          if (query.length === 0) {
            query = `?sort=${sorting}`;
          } else {
            query = query + `&sort=${sorting}`;
          }
        }

        const { data } = await axios({
          method: 'GET',
          url: `/api/courses${query}`,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
        setCourses(data.data);
        setLoading(false);
        updateUiValues(data.uiValues);
        console.log('Data is fetched');
      } catch (error) {
        //
        if (axios.isCancel(error)) return;
        console.log(error);
        console.log('Data is NOT fetched');
      }
    };

    fetchData();

    // in order not to call the API twice
    return () => cancel();
  }, [filter, params, sorting]);

  const priceInputHandler = (e, type) => {
    let newRange;
    if (type === 'lower') {
      if (Number(e.target.value) > priceRange[1]) {
        return;
      }
      newRange = [...priceRange];
      newRange[0] = Number(e.target.value);
      setPriceRange(newRange);
    }

    if (type === 'upper') {
      if (Number(e.target.value) < priceRange[0]) {
        return;
      }
      newRange = [...priceRange];
      newRange[1] = Number(e.target.value);
      setPriceRange(newRange);
    }
  };

  const onTextFilterHandler = () => {
    buildRangeFilter(priceRange);
  };

  const onSliderCommitHandler = (e, newValue) => {
    buildRangeFilter(newValue);
  };

  const buildRangeFilter = (newValue) => {
    const urlFilter = `?price[gte]=${newValue[0]}&price[lte]=${newValue[1]}`;
    setFilter(urlFilter);

    history.push(urlFilter);
  };

  const sortChangeHandler = (e) => {
    setPriceOrder((val) => (val = e.target.value));

    if (e.target.value === 'ascending') {
      setSorting('price');
    } else if (e.target.value === 'descending') {
      setSorting('-price');
    }
  };

  // clear filters
  const clearFilterHandler = () => {
    setFilter('');
    setSorting('');
    setPriceRange([0, sliderMax]);
    history.push('/');
  };

  return (
    <Container className={classes.root}>
      {/* 1. Filter and sort data */}
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Filters</Typography>
            <div className={classes.filters}>
              <Slider
                min={0}
                max={sliderMax}
                value={priceRange}
                valueLabelDisplay='auto'
                onChange={(e, newValue) => setPriceRange(newValue)}
                // when changed and commited
                onChangeCommitted={onSliderCommitHandler}></Slider>

              <div className={classes.priceRangeInputs}>
                <TextField
                  className={classes.minFilter}
                  size='small'
                  id='lower'
                  label='Min Price'
                  variant='outlined'
                  type='number'
                  disabled={loading}
                  value={priceRange[0]}
                  onChange={(e) => priceInputHandler(e, 'lower')}
                  onBlur={onTextFilterHandler}
                />

                <TextField
                  size='small'
                  id='upper'
                  label='Max Price'
                  variant='outlined'
                  type='number'
                  disabled={loading}
                  value={priceRange[1]}
                  onChange={(e) => priceInputHandler(e, 'upper')}
                  onBlur={onTextFilterHandler}
                />
              </div>
            </div>
          </Grid>

          {/* Second Grid Item */}
          <Grid item xs={12} sm={6}>
            <Typography gutterBottom>Sort By Price</Typography>

            <FormControl component='fieldset' className={classes.filters}>
              <RadioGroup
                aria-label='price-order'
                name='price-order'
                value={priceOrder}
                onChange={sortChangeHandler}>
                {/*  */}
                {/* Highest to Lowest */}
                <FormControlLabel
                  value='descending'
                  disabled={loading}
                  control={<Radio />}
                  label='Highes to Lowest'
                />

                {/* Lowest to Highest */}
                <FormControlLabel
                  value='ascending'
                  disabled={loading}
                  control={<Radio />}
                  label='Lowest to Highest'
                />
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
        <Button size='small' color='primary' onClick={clearFilterHandler}>
          Clear Filters
        </Button>
      </Paper>

      {/* 2. List the data */}
      <Grid container spacing={2}>
        {loading ? (
          <div className={classes.loader}>
            <CircularProgress size='4rem' thickness={5} />
          </div>
        ) : (
          courses.map((course) => (
            <Grid item key={course._id} xs={12} sm={6} md={4} lg={3}>
              <CoursesCard course={course} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default CoursesPage;
