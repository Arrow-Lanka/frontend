import React, { useState } from "react";
import { Box, Stepper, Step, StepLabel } from "@mui/material";

import SteamProduction from "./SteamProductionView";
import MillingProduction from "./MillingProductionView";
import Production from "./ProductionView";

const steps = [
  "Steam Production",
  "Milling Production",
  "Final Production",
];

const ProductionWorkflow = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Box>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel
              sx={{ cursor: "pointer" }}
              onClick={() => setActiveStep(index)}
            >
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box mt={3}>
        {activeStep === 0 && <SteamProduction isModal={false} />}
        {activeStep === 1 && <MillingProduction isModal={false} />}
        {activeStep === 2 && <Production isModal={false} />}
      </Box>
    </Box>
  );
};

export default ProductionWorkflow;
