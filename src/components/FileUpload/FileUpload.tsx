import * as React from 'react';
import { Props, State } from './interfaces';
import './FileUpload.scss';
import { IFFile } from '../../redux/initState/InterfacesState';

class FileUpload extends React.Component<Props, State> {
  fileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Props) {
    super(props);
    this.state = {
      files: null,
    };
    this.fileInput = React.createRef();
  }

  render() {
    const { setFiles } = this.props;
    const { files } = this.state;

    return (
      <div className="file-upload">
        <div>
          {files?.map((item, i) => (
            <div className="file-upload__line" key={i}>
              <a href={item.file} download={item.nameFile} target="_blank" rel="noreferrer">
                {item.nameFile}
              </a>
              <div
                className="file-upload__delete-files"
                onClick={() => {
                  const newFiles = files.filter((x) => x !== item);
                  setFiles(newFiles);
                  this.setState({ files: newFiles });
                }}
              >
                удалить
              </div>
            </div>
          ))}

          <label htmlFor="file-upload-input" className="file-upload__attach">
            Загрузить файлы
          </label>
          <input
            type="file"
            id="file-upload-input"
            name="document"
            className="file-upload__input"
            onChange={(e) => {
              this.loadingFile(e);
            }}
            ref={this.fileInput}
            multiple
          ></input>
        </div>
      </div>
    );
  }

  async loadingFile(e: React.ChangeEvent<HTMLInputElement>) {
    const { setFiles } = this.props;
    const { current } = this.fileInput;

    if (current?.files != null) {
      const files: IFFile[] = [];
      for (let i = 0; i < current.files.length; i++) {
        if (e.target.files !== null) {
          files.push((await this.reader({ e, file: current.files[i] })) as IFFile);
        }
      }
      setFiles(files);

      this.setState({
        files,
      });
    }
  }

  reader({ file, e }: { file: File; e: React.ChangeEvent<HTMLInputElement> }) {
    const name = file.name;
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.addEventListener('load', (e) => {
        if (e.target && e.target.result) {
          resolve({
            nameFile: name,
            file: e.target.result.toString(),
          });
        }
      });
      reader.readAsDataURL(file);
    });
  }
}

export default FileUpload;
