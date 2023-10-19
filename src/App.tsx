import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import axios from "axios";

interface body {
  userImage: any;
}

function App() {
  const [img, setImg] = useState<any>();

  const [name, setName] = useState<any>();

  const fileRef = useRef<HTMLInputElement>(null);

  const imageUrl = "http://localhost:9090/api/v1/images/1";

  const fetchImage = async () => {
    const res = await fetch(imageUrl);
    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setImg(imageObjectURL);
  };

  useEffect(() => {
    fetchImage();
  }, [name]);

  const handleSubmit = (event: FormEvent) => {
    // const obj: any = {};
    // event.preventDefault();
    // console.log(event.target.files);
    // axios.post(imageUrl, obj).then((res) => {
    //   console.log(res);
    // });
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.files); // for debuging process
    const obj = new FormData();
    if (event.target.files != null) {
      obj.append("userImage", event.target.files[0]);
      console.log(obj); //testing purpose
      axios //npm install axios
        .post(imageUrl, obj)
        .then((res) => {
          return res;
        })
        .then((data) => {
          console.log(data.data);
          setName(data.data.imageName);
        });
    }
  };

  return (
    <>
      <form
        encType="multipart/form-data"
        action="POST"
        className="form-control"
        onSubmit={handleSubmit}
      >
        <label htmlFor="image">Upload Image</label>
        <input
          id="image"
          type="file"
          name="userImage"
          ref={fileRef}
          onChange={handleFileChange}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      <img src={img} alt="icons" />
    </>
  );
}

export default App;
