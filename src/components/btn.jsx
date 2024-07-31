const HowToPlay = ({index}) => {
   return index ==1 ? (
   <div className= "popUp">Choose Your Region</div>
)
        :index ==2 ? (<div className="popUp">Choose Your Difficulty</div>)
        : index ==3? (<div className="popUp">How To Play</div>)
        : null;

}

export default HowToPlay;