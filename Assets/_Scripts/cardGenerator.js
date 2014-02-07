// Manually constructed Array of all 20 possible card positions...

var cardLocations =	new Array 
( 
	Vector3 (-1.8, 0, 0), Vector3(-0.6, 0, 0), Vector3(0.6, 0, 0), Vector3(1.8, 0, 0),
	Vector3 (-1.8, 0, -1.2), Vector3(-0.6, 0, -1.2), Vector3(0.6, 0, -1.2), Vector3(1.8, 0, -1.2),
	Vector3 (-1.8, 0, -2.4), Vector3(-0.6, 0, -2.4), Vector3(0.6, 0, -2.4), Vector3(1.8, 0, -2.4), 
	Vector3 (-1.8, 0, -3.6), Vector3(-0.6, 0, -3.6), Vector3(0.6, 0, -3.6), Vector3(1.8, 0, -3.6), 
	Vector3 (-1.8, 0, -4.8), Vector3(-0.6, 0, -4.8), Vector3(0.6, 0, -4.8), Vector3(1.8, 0, -4.8)  
);
				
var allCards : GameObject;
var parentObject : GameObject;
var usedCardLocation;
var nOfCards = 40;

var uniqueCard = new Array ();
				
				
function Start () 
{	
	// Find all Game Objects that are Tagged "Cards"...
	
	uniqueCard = allCards.FindGameObjectsWithTag ("Cards");
	Debug.Log (uniqueCard);
	// Randomize the order of the Cards...
	
	for ( var c=0; c <= uniqueCard.length-1; c++)
	{
		var thisCard = Random.Range (c, uniqueCard.length);
		
		usedCardLocation = uniqueCard [c];
		
		uniqueCard [c] = uniqueCard [thisCard];
		
		uniqueCard [thisCard] = usedCardLocation;
	}
	
	// Randomize the order of the Card Locations...
	
	for ( var i=0; i <= nOfCards-1; i++)
	{
	
		var thisCardLocation = Random.Range (i, nOfCards);
		usedCardLocation = cardLocations [i];
		cardLocations [i] = cardLocations [thisCardLocation];
		cardLocations [thisCardLocation] = usedCardLocation;
		
		// Instantiate our Randomized Cards and parent them to empty Game Objects so the animations play in Local Space...
		
		var theCard : GameObject = Instantiate (uniqueCard [i/2], Vector3(0,0,0), Quaternion.identity);		
		var theParent : GameObject = Instantiate (parentObject, Vector3(0,0,0) , Quaternion.identity);
		
	theCard.transform.parent = theParent.transform;		
		theParent.transform.position = cardLocations [i];
	}
	
	// Destroy the group of cards that we're using to generate the Card Locations...
	
//	Destroy (allCards, 0.1);
}	