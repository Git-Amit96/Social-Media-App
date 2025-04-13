const Button = ({ handleClick, text, style = "", disabled = false }) => {
    return (
      <button onClick={handleClick} disabled={disabled} className={`w-full text-white text-sm font-semibold py-2 rounded-md ${disabled ? "bg-blue-400 cursor-not-allowed opacity-50" : "bg-[#0095f6] hover:bg-[#1877f2]"} ${style} `} >
        {text}
      </button>
    );
  };
  
  export default Button;
  