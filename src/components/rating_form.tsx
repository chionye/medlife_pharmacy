/** @format */

import { FormSelect } from "./form_input";
import { Rating } from "react-simple-star-rating";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";
import { toTitleCase } from "@/services/helpers";

interface RatingFormProps {
  formAttributes: any;
  criteria: string[];
  onSubmit: (formData: any) => void;
}

const RatingForm: React.FC<RatingFormProps> = ({
  criteria,
  formAttributes,
  onSubmit,
}: any) => {
  // Initialize formData to store both ratings and FormSelect values
  const [formData, setFormData] = useState<any>({
    ratings: criteria.reduce((acc: any, criterion: any) => {
      acc[criterion] = 0; // Initialize each criterion rating with 0
      return acc;
    }, {}),
    formSelects: formAttributes.reduce((acc: any, form: any) => {
      acc[form.name] = "";
      return acc;
    }, {}),
  });

  const handleRating = (rate: number, criterion: string) => {
    setFormData((prevData: any) => ({
      ...prevData,
      ratings: {
        ...prevData.ratings,
        [criterion]: rate, // Update the rating for the specific criterion
      },
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      formSelects: {
        ...prevData.formSelects,
        [name]: value, // Update the selected value for the FormSelect
      },
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData); // Submit the form with both the ratings and FormSelect values
  };

  return (
    <>
      <div className='flex lg:flex-row flex-col mt-20 px-5 lg:gap-20'>
        <div className='flex lg:flex-row flex-col justify-between gap-3 lg:w-2/3'>
          {formAttributes.length > 0 &&
            formAttributes.map((form: any) => (
              <FormSelect
                key={form.name}
                value={formData.formSelects[form.name]} // Get the value from formData
                options={form.options}
                name={form.name}
                label={form.label}
                changeFunction={handleChange} // Handle changes for FormSelect
              />
            ))}
        </div>
      </div>
      <div className='mt-10 px-5'>
        <p className='text-sm font-normal'>Rating Metrics</p>
        <div className='flex lg:flex-row flex-col justify-between gap-3 mt-4'>
          <Card className='px-10 py-10 shadow-lg lg:w-1/2'>
            {criteria.map((criterion: string, index: number) => (
              <div
                className='flex lg:flex-row flex-col justify-between items-center mb-4'
                key={index}>
                <span className='flex items-center gap-2'>
                  <span>{toTitleCase(criterion.split("_").join(" "))}</span>
                </span>
                <div>
                  <Rating
                    onClick={(rate) => handleRating(rate, criterion)}
                    initialValue={formData.ratings[criterion]} // Set the initial value for each criterion
                    size={24} // Adjust the star size if needed
                  />
                </div>
              </div>
            ))}
            <div className='flex justify-center'>
              <Button
                className='bg-[#4BB543] w-1/2 mt-6 p-4'
                onClick={handleSubmit}>
                Submit
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </>
  );
};

export default RatingForm;
