import { SelectChangeEvent } from "@mui/material";

const handleInputChange = <T extends Record<string, any>>(
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setState: React.Dispatch<React.SetStateAction<T>>
) => {
  const { name, value } = event.target;
  setState((prev) => ({
    ...prev,
    [name]: name === "price" ? Number(value) : value,
  }));
};

const handleSelectChange = <T>(
  event:
    | SelectChangeEvent<string | number>
    | (Event & { target: { value: string; name: string } })
    | (Event & { target: { value: number; name: string } }),
  setState: React.Dispatch<React.SetStateAction<T>>
) => {
  const { name, value } = event.target;
  setState((prev) => ({
    ...prev,
    [name]: value,
  }));
};

export { handleInputChange, handleSelectChange };
