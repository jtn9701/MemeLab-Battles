// TODO: this takes in an image as a prop
function ImageContainer({ gifURL }) {
  return (
    <div>
      <img
        src={gifURL || "https://i.imgur.com/MK3eW3As.jpg"}
        alt="Clickable Image"
        onClick={() => {
          console.log("Image Clicked");
        }}
      />
    </div>
  );
}

export default ImageContainer;
