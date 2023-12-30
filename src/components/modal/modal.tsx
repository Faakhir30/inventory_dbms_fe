import "./modal.scss";

type Props = {
  columns: any[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  values: any[];
  setValues:any
  handleSubmit: any
  title: string
};

const Modal = ({columns, setOpen, values, setValues, handleSubmit, title}: Props) => {
  return (
    <div className="add">
      <div className="modal">
        <span className="close" onClick={() => setOpen(false)}>
          X
        </span>
        <h1>{title}</h1>
        <form onSubmit={handleSubmit}>
          {
            columns.map((col: any) => {
              return  <div className="item">
                    <label>{col}</label>
                    <input type={'text'} placeholder={col} value={values[col]} onChange={
                      (e)=>setValues({...values, [col]: e.target.value})
                    } />
                  </div>
            })
          }
          <button>Send</button>
        </form>
      </div>
    </div>
  );
};

export default Modal;