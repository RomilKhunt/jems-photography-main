import React, { useContext, useEffect, useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Card, CardActions,
  CardMedia,
  IconButton,
  TextField
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { MyContext } from '../../App';
import { useNavigate } from 'react-router-dom';
const itemData = [
  { img: "../imgs/main-slider/1.jpg" },
  { img: "../imgs/main-slider/5.jpg" }  
  
];
const AddRemoveGridImgs = () => {
  const [serviceInfoArray,setServiceInfoArray] =useState(null) 
  const [selectedService, setSelectedService] = useState(null);
  const [selectedServiceData, setSelectedServiceData] = useState([]);
  const [newImages, setNewImages] = useState([]);
  const {gservices,setGservices}=useContext(MyContext);
  const backend = process.env.REACT_APP_BACKEND;
  const token= "jems@jkotiajrekjak752ukajk"
  const {isLogin}=useContext(MyContext);
  const nav = useNavigate();
  const [newimgUrl,setNewImagesUrl]=useState(null);

  const handleServiceChange = (event) => {
    const selectedServiceKey = event.target.value;
    // const selectedServiceInfo = serviceInfoArray.find(
    //   (service) => service.title === selectedServiceKey
    // );
    setSelectedService(selectedServiceKey);
    // console.log(selectedServiceKey.imglist);
    // setSelectedServiceData(selectedServiceInfo ? selectedServiceInfo.imgData : []);
  };

  const handleDeleteImage =async (index) => {
    let imglist = selectedService.imglist;
    imglist.splice(index,1);
    // console.log(imglist);
    let ss = selectedService;
    ss.imglist = imglist;
    
    const dt = await fetch(`${backend}/updateInnerService/${selectedService._id}`,{
      method:"POST",
      headers:{
        token:token,
        "Content-type": "application/json",
      },
      body:JSON.stringify({
        imglist
      })
    })
    const fr = await dt.json();
    if(fr){
      setSelectedService(ss);
    }else{
      alert('error')
    }
    // const updatedServiceData = [...selectedServiceData];
    // updatedServiceData.splice(index, 1);
    // setSelectedServiceData(updatedServiceData);
  };

  const handleNewImageChange =async (e) => {
    // setNewImages([...newImages, event.target.value]);
    e.preventDefault()
    let imglist = selectedService.imglist;
    imglist.push(newimgUrl);
    let ss = selectedService;
    ss.imglist = imglist;

    const dt = await fetch(`${backend}/updateInnerService/${selectedService._id}`,{
      method:"POST",
      headers:{
        token:token,
        "Content-type": "application/json",
      },
      body:JSON.stringify({
        imglist
      })
    })
    const fr = await dt.json();
    if(fr){
      setSelectedService(null);
      setNewImagesUrl(null);
      setTimeout(() => {
        setSelectedService(ss);
      }, 1000);
    }else{
      alert('error');
    }
  };

  const handleAddMoreImages = () => {
    setNewImages([...newImages, null]);
  };
  const getServices = async ()=>{
    const dt = await fetch(`${backend}/services`,{
      method:"GET",
      headers:{
        token:token
      }
    })
    const fr = await dt.json();
    if(fr.status=="ok"){
      setServiceInfoArray(fr.dt);
    }else{
      alert("error");
    }
  }
  // Assuming you have a submit function to handle the form submission
  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Selected Service Data:", selectedServiceData);
    console.log("New Images:", newImages);
  };
  useEffect(()=>{
    // getServices()
    isLogin? getServices() : nav("/dashboard");
   },[])
  return (
    <Container>
      <Paper elevation={3} style={{ padding: '25px', marginTop: '25px' }}>
        <Typography variant="h5" gutterBottom>
          Add or Remove Grid Images
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormControl fullWidth style={{ marginBottom: '20px' }}>
            <InputLabel shrink id="service-select-label">
              Select Service
            </InputLabel>
            <Select
              labelId="service-select-label"
              id="service-select"
              value={selectedService}
              onChange={handleServiceChange}
            >
              {serviceInfoArray && serviceInfoArray.map((service, index) => (
                <MenuItem key={index} value={service}>
                  {service.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Section for adding new images */}
         {selectedService && <Grid container spacing={3}>
            <Grid item xs={12}>
              {newImages.map((image, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  {/* <input
                    type="text"
                    id={`newImageInput-${index}`}
                    placeholder='Enter Image Url here'
                    value={newimgUrl}
                    onChange={(e)=>{setNewImagesUrl(e.target.value)}}
                  /> */}
                  <TextField  style={{width:"100%"}}
                    type="text"
                    id={`newImageInput-${index}`}
                    value={newimgUrl}
                    placeholder='Enter Image Url here'
                    onChange={(e)=>{setNewImagesUrl(e.target.value)}}
                  />
                </div>
              ))}
              {newImages.length==0 ? <Button variant="outlined"  onClick={handleAddMoreImages}>
                Add More Images
              </Button> : <Button variant="outlined"  onClick={handleNewImageChange}>
                Submit
              </Button> }
            </Grid>
          </Grid>}

          {/* Section for managing active images */}
          <Grid container spacing={3}>
            {selectedService?.imglist && selectedService.imglist.map((image, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    alt={`img-${index}`}
                    height="140"
                    image={image}
                    style={{ objectFit: 'cover' }}
                  />
                  <CardActions style={{ justifyContent: 'center', background: 'crimson', color: "#fff" }}>
                    <div
                      aria-label="delete"
                      onClick={() => handleDeleteImage(index)}
                    >
                      <DeleteIcon />
                    </div>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>

        </form>
      </Paper>
    </Container>
  );
};

export default AddRemoveGridImgs;