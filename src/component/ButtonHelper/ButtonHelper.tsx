/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Typography, makeStyles } from '@material-ui/core';
import React, { memo, ReactElement } from 'react';

import { PhoneIcon } from '../../iconos/PhoneIcon';
import useHelp from '../../Hook/useHelp';

const useStyles = makeStyles(() => ({
  content: {
    display: 'grid',
    justifyContent: 'center',
    justifyItems:'center',
    '& span.MuiButton-label':  {
      justifyItems:'center',
    }
  },
}));

function ButtonHelper(): ReactElement {
  const classes = useStyles();
  const { hasPending, solicitar, hasSolicitudes } = useHelp();

  return (
    <>
      {hasSolicitudes() ? (
        <Button  className={classes.content}  disabled>
          <PhoneIcon color="#efb810" />
          <Typography variant="h6" style={{ color: 'white' }}>
            En camino
          </Typography>
        </Button>
      ) : (
        <Button
          disabled={hasPending}

          className={ `${hasPending === true ? 'inactive' : ''} classes.content`}
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
