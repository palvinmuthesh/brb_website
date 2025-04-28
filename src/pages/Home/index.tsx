import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Chip,
  Pagination,
  useTheme
} from '@mui/material';
import styles from './Home.module.css';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchVendors } from '../../redux/slices/vendorSlice';
import { fetchServices } from '../../redux/slices/serviceSlice';
import SkeletonCard from '../../components/SkeletonCard';
import ThemeToggle from '../../components/ThemeToggle';
import { RootState } from '../../redux/store';
import { fetchLocations } from '../../redux/slices/locationSlices';

const Home: React.FC = () => {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const dispatch = useAppDispatch();
  const [selectedServiceId, setSelectedServiceId] = useState<string | "">("");
  const [selectedLocationId, setSelectedLocationId] = useState<string | "">("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  const { data: vendors, status: vendorStatus, error: vendorError } = useAppSelector(
    (state: RootState) => state.vendor
  );
  const { data: services, status: serviceStatus, error: serviceError } = useAppSelector(
    (state: RootState) => state.service
  );
  const { data: locations } = useAppSelector(
    (state: RootState) => state.locations
  );

  useEffect(() => {
    dispatch(fetchVendors());
    dispatch(fetchServices());
    dispatch(fetchLocations());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedServiceId, selectedLocationId]);

  if (vendorStatus === "loading" || serviceStatus === "loading") {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.cloudBackground}></div>
        <div className={styles.container}>
          <Typography variant="h4" gutterBottom>Vendors & Services</Typography>
          <div className={styles.grid}>
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        </div>
      </div>
    );
  }

  if (vendorStatus === "failed" || serviceStatus === "failed") {
    return (
      <div className={styles.pageWrapper}>
        <div className={styles.cloudBackground}></div>
        <div className={styles.container}>
          <Typography color="error">Error: {vendorError || serviceError}</Typography>
        </div>
      </div>
    );
  }

  const getVendorServicePairs = () => {
    if (!Array.isArray(vendors) || !Array.isArray(services)) return [];

    return vendors.flatMap((vendor) => {
      if (selectedLocationId && vendor.location !== selectedLocationId) return [];

      return vendor.services
        .map((serviceId: string) => {
          const service = services.find((s) => s._id === serviceId);
          if (!service) return null;
          if (selectedServiceId && selectedServiceId !== service._id) return null;
          return { vendor, service };
        })
        .filter(Boolean);
    });
  };

  const filteredPairs = getVendorServicePairs();
  const totalPages = Math.ceil(filteredPairs.length / itemsPerPage);
  const paginatedPairs = filteredPairs.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.cloudBackground}></div>
      <div className={styles.container} style={{
          background: isLight ? '#ffffff' : '#1e1e1e',
          boxShadow: isLight
            ? '0 4px 20px rgba(0, 0, 0, 0.1)'
            : '0 4px 20px rgba(0, 0, 0, 0.5)'}}>
        {/* <ThemeToggle /> */}
        <Typography variant="h4" gutterBottom>Vendors & Services</Typography>

        <div className={styles.dropdownContainer}>
          {services && services.length > 0 && (
            <select
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className={styles.dropdown}
              style={{
                background: isLight ? '#ffffff' : '#1e1e1e',
                boxShadow: isLight
                  ? '0 4px 20px rgba(0, 0, 0, 0.1)'
                  : '0 4px 20px rgba(0, 0, 0, 0.5)',
                color: isLight ? 'black' : 'white'
              }}
            >
              <option value="">All Services</option>
              {services.map((service: any) => (
                <option key={service._id} value={service._id}>
                  {service.name}
                </option>
              ))}
            </select>
          )}

          {locations && locations.length > 0 && (
            <select
              value={selectedLocationId}
              onChange={(e) => setSelectedLocationId(e.target.value)}
              className={styles.dropdown}
              style={{
                background: isLight ? '#ffffff' : '#1e1e1e',
                boxShadow: isLight
                  ? '0 4px 20px rgba(0, 0, 0, 0.1)'
                  : '0 4px 20px rgba(0, 0, 0, 0.5)',
                color: isLight ? 'black' : 'white'
              }}
            >
              <option value="">All Locations</option>
              {locations.map((location: any) => (
                <option key={location._id} value={location._id}>
                  {location.city}
                </option>
              ))}
            </select>
          )}
        </div>

        <div className={styles.grid}>
          {paginatedPairs.length > 0 ? (
            paginatedPairs.map(({ vendor, service }: any) => (
              <Card key={`${vendor._id}-${service._id}`} className={styles.card}>
                <CardMedia
                  component="img"
                  height="140"
                  image={vendor.image}
                  alt={service.name}
                />
                <CardContent>
                  <Typography variant="h6">{vendor.name}</Typography>
                  <div className={styles.tags}>
                    {vendor.tags.map((tag: string) => (
                      <Chip key={tag} label={tag} size="small" />
                    ))}
                  </div>
                  <Button
                    variant="contained"
                    fullWidth
                    href={`/booking/${vendor._id}/${service._id}`}
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Typography>No vendors available.</Typography>
          )}
        </div>

        {totalPages > 1 && (
          <div className={styles.paginationContainer}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
