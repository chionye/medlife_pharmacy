/** @format */

import { FormSelect } from "./form_input";
import StarRating from "./star_rating";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";

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
  const [formData, setFormData] = useState<any>({});

  const handleRatingChange = (criterion: string, rating: number) => {
    setFormData((prevData: any) => ({
      ...prevData,
      ratings: {
        ...prevData.ratings,
        [criterion]: rating,
      },
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  return (
    <>
      <div className='flex md:flex-row flex-col mt-20 px-5 md:gap-20'>
        <div className='flex md:flex-row flex-col justify-between gap-3 md:w-2/3'>
          {formAttributes.map((form: any) => (
            <FormSelect
              value={formData[form.name]}
              options={form.options}
              name={form.name}
              label={form.label}
              changeFunction={handleChange}
            />
          ))}
        </div>
      </div>
      <div className='mt-20 px-5'>
        <p className='text-sm font-normal'>Rating Metrics</p>
        <div className='flex md:flex-row flex-col justify-between gap-3 mt-4'>
          <Card className='px-10 py-10 shadow-lg md:w-1/2'>
            {criteria.map((criterion: any, index: number) => (
              <div
                className='flex md:flex-row flex-col justify-between items-center'
                key={index}>
                <span className='flex items-center gap-2'>
                  <span>{criterion}</span>
                </span>
                <StarRating
                  label={criterion}
                  onRatingChange={(rating) =>
                    handleRatingChange(criterion, rating)
                  }
                />
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
