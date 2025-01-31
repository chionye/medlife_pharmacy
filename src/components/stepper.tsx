import check from "@/assets/check.svg";
interface StepperProps {
  steps: string[];
  currentStep: number;
}

export const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <div className='flex items-center justify-center my-6'>
      {steps.map((step, index) => (
        <div key={index} className='flex items-center'>
          {/* Step Circle */}
          <div
            className={`w-14 h-14 flex items-center justify-center rounded-[10px] text-white font-semibold transition-all duration-300
              ${
                index < currentStep
                  ? "bg-[#585BA8]" // Completed step
                  : index === currentStep
                  ? "bg-[#585BA8]" // Active step
                  : "bg-gray-300" // Pending step
              }`}>
            {index < currentStep ? <img src={check} alt="check icon" /> : `0${step}`}
          </div>

          {/* Step Connector (Line) */}
          {index !== steps.length - 1 && (
            <div
              className={`h-1 w-10 md:w-16 lg:w-24 mx-2 ${
                index < currentStep ? "bg-green-500" : "bg-gray-300"
              }`}></div>
          )}
        </div>
      ))}
    </div>
  );
};
