function ImageContainer() {
  return (
    <div>
      <img
        src="https://i.imgur.com/MK3eW3As.jpg"
        alt="Clickable Image"
        onClick={() => {
          console.log("Image Clicked");
        }}
      />
    </div>
  );
}

export default ImageContainer;
