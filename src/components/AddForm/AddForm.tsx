import { Props } from './interfaces';
import './AddForm.scss';
import { Button } from '@mui/material';

const AddForm = ({ content, saved, canceled }: Props) => {
  return (
    <form className="add-form">
      {content}
      <div className="add-form__buttons">
        <Button onClick={() => canceled()}>Отменить</Button>
        <Button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            saved();
          }}
        >
          Сохранить
        </Button>
      </div>
    </form>
  );
};

export default AddForm;
