/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Typography } from '@material-ui/core';
import React, { memo, ReactElement } from 'react';

import { PhoneIcon } from '../../iconos/PhoneIcon';
import useHelp from '../../Hook/useHelp';

function ButtonHelper(): ReactElement {
  const { hasPending, solicitar, hasSolicitudes } = useHelp();

  return (
    <>
      {hasSolicitudes() ? (
        <Button style={{  display: 'grid', justifyItems:'center' }} disabled>
          <PhoneIcon color="#efb810" />
          <Typography variant="h6" style={{ color: 'white' }}>
            En camino
          </Typography>
        </Button>
      ) : (
        <Button
          disabled={hasPending}
          style={{  display: 'grid', justifyItems:'center' }}
          className={`${hasPending === true ? 'inactive' : ''}`}
          onClick={solicitar}
        >
          <PhoneIcon color="" />
          <Typography variant="h5" style={{ color: 'white' }}>
            Ayuda
          </Typography>
        </Button>
      )}
    </>
  );
}

export default memo(ButtonHelper);
