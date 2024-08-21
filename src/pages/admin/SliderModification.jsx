import React, { useContext, useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Paper,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../App';

const SliderModification = () => {
  const [mainSliderData,setMainSliderData] = useState(null);
  const [newImgUrl,setNewImgUrl]=useState("");
  const [portraitSliderData,setPortraitSliderData] = useState(null);
  const [isMain,setIsMain]=useState(true);
  const backend = process.env.REACT_APP_BACKEND;
  const token = "jems@jkotiajrekjak752ukajk"
  const nav  = useNavigate();
  const {isLogin}=useContext(MyContext);

  const [newImages, setNewImages] = useState([]);
  const [activeImages, setActiveImages] = useState(mainSliderData);
  const [selectedSlider, setSelectedSlider] = useState('mainSlider');

  const handleNewImageChange = async (event) => {
    // setNewImages([...newImages, event.target.files[0]]);
    if(newImgUrl=="" || newImgUrl.length<=10 || !mainSliderData || !portraitSliderData){
      alert("Enter Valide Url");
    }else{
      const ind = activeImages[activeImages.length-1]?.index+1 || 1
      console.log(ind);
      const dt = await fetch(`${backend}/${isMain?"mainsliderAddImage":"portraitSlider"}`,{
        method:'Post',
        headers:{
          "Content-type": "application/json",
          token:token,
        },
        body:JSON.stringify({
          link: newImgUrl,
          index: ind
        }) 
      })
      const fr = await dt.json();
      if(fr.status=="ok"){
        alert("image Added Successfully");
        setNewImgUrl("");
        isMain?getImgs():getImgsP();
      }else{
        alert("error");
      }
    }

  };

  const handleAddMoreImages = () => {
    setNewImages([...newImages, null]);
  };

  const handleMoveRight =async (index) => {
    // const updatedActiveImages = [...activeImages];
    // const removedImage = updatedActiveImages.splice(index, 1)[0];
    // updatedActiveImages.splice(index + 1, 0, removedImage);
    // setActiveImages(updatedActiveImages);
    const id1 = activeImages[index]._id;
    const id2 = activeImages[index+1]._id;
    const dt = await fetch(`${backend}/${isMain?"swapSliderMain":"swapSliderPortrait"}/${id1}/${id2}`,{
      method:"GET",
      headers:{
        token:token
      }
    })
    const fr = await dt.json();
    if(fr.status=="ok"){
      isMain?getImgs():getImgsP()
    }else{
      alert("not Move...");
    }
  };

  const handleMoveLeft =async (index) => {
    // const updatedActiveImages = [...activeImages];
    // const removedImage = updatedActiveImages.splice(index, 1)[0];
    // updatedActiveImages.splice(index - 1, 0, removedImage);
    // setActiveImages(updatedActiveImages);
    const id1 = activeImages[index]._id;
    const id2 = activeImages[index-1]._id;
    const dt = await fetch(`${backend}/${isMain?"swapSliderMain":"swapSliderPortrait"}/${id1}/${id2}`,{
      method:"GET",
      headers:{
        token:token
      }
    })
    const fr = await dt.json();
    if(fr.status=="ok"){
      isMain?getImgs():getImgsP()
    }else{
      alert("not Move...");
    }
  };

  const handleDelete = async (index) => {
    // const updatedActiveImages = [...activeImages];
    // updatedActiveImages.splice(index, 1);
    // setActiveImages(updatedActiveImages);
    
    const id = isMain ? mainSliderData[index]._id : portraitSliderData[index]._id ;
    // console.log(id);
    const dt = await fetch(`${backend}/${isMain?"mainslider":"portraitslider"}/${id}`,{
      method:'DELETE',
      headers:{
        token: token
      }
    })
    const fn= await dt.json();
    console.log(fn.status);
    if(fn.status=="ok"){
      alert("delete Successfully");
      isMain?getImgs():getImgsP();
    }else{
      alert("not Deleted");
    }
  };

  const handleSliderChange = (event) => {
    setSelectedSlider(event.target.value);
    // Resetting newImages and activeImages based on the selected slider
    setNewImages([]);
    setActiveImages(event.target.value === 'mainSlider' ? mainSliderData : portraitSliderData);
    setIsMain(!isMain)
  };
  const getImgs = async ()=>{
    const dt = await fetch(`${backend}/mainsliderImages`,{
      method:"GET",
      headers:{
        token: token,
      }
    })
    const finalresult = await dt.json();
    // console.log(finalresult?.dt[0].link);
    setMainSliderData(finalresult?.dt);
    isMain && setActiveImages(finalresult?.dt);
  }
  const getImgsP = async ()=>{  
    const dt = await fetch(`${backend}/portraitSlider`,{
      method:"GET",
      headers:{
        token: token,
      }
    })
    const finalresult = await dt.json();
    setPortraitSliderData(finalresult?.dt);
    !isMain && setActiveImages(finalresult?.dt);
  }
  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Selected Slider:", selectedSlider);
    console.log("New Images:", newImages);
    console.log("Active Images:", activeImages);
  };
  useEffect(()=>{
    if(isLogin){
      getImgs();
      getImgsP();
    }else{
      nav("/dashboard");
    }
  },[])
  return (
    <Container>
      <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h5" gutterBottom>
          Modify Slider
        </Typography>
        {/* Radio buttons for selecting slider type */}
        <RadioGroup
          row
          aria-label="slider-type"
          name="slider-type"
          value={selectedSlider}
          onChange={handleSliderChange}
        >
          <FormControlLabel value="mainSlider" control={<Radio />} label="Main Slider" />
          <FormControlLabel value="portraitSlider" control={<Radio />} label="Portrait Slider" />
        </RadioGroup>

        {/* Form for adding new images */}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {newImages.map((image, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField  style={{width:"100%"}}
                    type="text"
                    id={`newImageInput-${index}`}
                    value={newImgUrl}
                    placeholder='Add Link Of New Image'
                    onChange={(e)=>{
                      setNewImgUrl(e.target.value)
                    }}
                  />
            </Grid>
          </Grid>
                </div>
              ))}
              {newImages.length==0 ? <Button variant="outlined" startIcon={<AddIcon />} onClick={handleAddMoreImages}>
                Add More Images
              </Button> : <Button variant="outlined" startIcon={<AddIcon />} onClick={handleNewImageChange}>
                Submit
              </Button> }
            </Grid>
          </Grid>
        </form>

        {/* Section for managing active images */}
        <div style={{ marginTop: '20px' }}>
          <Typography variant="h6" gutterBottom>
            Active Images in Slider
          </Typography>
          <div id='modi-imgs'>
            {activeImages && activeImages.map((image, index) => (
              <div key={index} className='seq-img'>
                <img
                  src={image.link}
                  alt={`img-${index}`}
                  style={{ width: '100%', height: 'auto'}}
                />
                <div className='modi-btns'>
                  {index !=0 && <div className='m-left' onClick={() => handleMoveLeft(index)}>
                    <NavigateBeforeIcon />
                  </div>}
                  <div className='m-del' onClick={() => handleDelete(index)}>
                    <DeleteIcon />
                  </div>
                  {index < activeImages.length-1 && <div className='m-rig' onClick={() => handleMoveRight(index)}>
                    <NavigateNextIcon />
                  </div>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Paper>
    </Container>
  );
};

export default SliderModification;
