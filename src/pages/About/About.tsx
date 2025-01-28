import { Typography } from '@equinor/eds-core-react';
import { InfoPageComponent } from '../../components/InfoPageComponent/InfoPageComponent';

export const About = () => {
  return (
    <InfoPageComponent title="About PEPM">
      <Typography variant="body_long">
        PEPM is developed in collaboration with Equinor/Bouvet/Norwegian
        Computing Center.
      </Typography>
      <Typography variant="body_long">
        The goal of the application is to extract reservoir modelling parameters
        for object-based and variogram-based methods from digital geological
        process models. The digital models are representative for various
        outcrop analogues and subsurface reservoirs. PEPM will provide
        geomodelling parameters on a scenario basis ready to be used in a FMU
        (Fast Modelling Update) context.
      </Typography>
      <Typography variant="body_short_bold">PEPM allows for</Typography>
      <Typography>
        <ul>
          <li>
            Import digital conceptual models from Delft3D-GT in .nc (NetCDF)
            format
          </li>
          <li>
            Assign metadata to the digital conceptual model related to
            depositional environments, architectural elements and relevant
            analogues and subsurface reservoir intervals
          </li>
          <li>Estimation of object size of architectural elements</li>
          <li>
            Estimation of variogram parameters for architectural elements, grain
            size, porosity and permeability{' '}
          </li>
          <li>Make the results available through an API</li>
          <li>Export results to an Excel spreadsheet</li>
          <li>Export the model grid file in a RESQML format</li>
        </ul>
      </Typography>
    </InfoPageComponent>
  );
};
