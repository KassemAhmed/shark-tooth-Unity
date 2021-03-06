var hit : RaycastHit;

var particlePoof : GameObject;

var matchSound : AudioSource;
var cardFlipUp : AudioSource;
var cardFlipDown : AudioSource;

var timeGUI : GUIText;
var scoreGUI : GUIText;
var winGUI : GUITexture;
var loseGUI : GUITexture;

var matchOne : GameObject;
var matchTwo : GameObject;

private var thisShadowPlaneOne : GameObject;
private var thisShadowPlaneTwo : GameObject;

var findShadowPlane;

var cardsLeft = 20;
var timeLeft = 180;
var timeTotal = 180;
var score = 0;

function Start()
{
	if(Screen.width>320)
	{
		scoreGUI.pixelOffset = new Vector3(-120,-5);
		timeGUI.pixelOffset = new Vector3(20,-5);
	}
}

while (true) 
{
	// Use Raycast to pick cards that have mesh colliders attached...
	
	var ray = Camera.main.ScreenPointToRay (Input.mousePosition);
	
	if (Input.GetMouseButtonDown (0))
	{
		if (Physics.Raycast (ray, hit, 100)) 
		{
			if (! matchOne)
			{
				revealCardOne();
			}
			else
			{
				yield revealCardTwo();
				if (cardsLeft == 0) 
				{
					yield gameWon();
				}
			}
		}
	}
	
	timeLeft = timeTotal - Time.time;
	timeGUI.text = "" + timeLeft;
	
	if (timeLeft <= 0) 
	{
		yield gameLost();	
	}
	
	// Wait for next frame
	yield;
}

function revealCardOne()
{	
	matchOne = hit.transform.gameObject;
	
	findShadowPlane = matchOne.transform.parent.gameObject.GetComponentsInChildren (Transform);
	
	for (var shadowPlane : Transform in findShadowPlane) 
	{	
		if (shadowPlane.gameObject.name == "shadowPlane(Clone)")
		{
    		thisShadowPlaneOne = shadowPlane.gameObject;
		}
	}
	
	matchOne.animation.Play("reveal");
	
	cardFlipUp.Play();
	
	yield new WaitForSeconds (0.2);
	
	thisShadowPlaneOne.renderer.enabled = false;
	
	// Wait for the animation to have finished
	
	yield WaitForSeconds (matchOne.animation["reveal"].length);
}

 	
function revealCardTwo()
{	
	matchTwo = hit.transform.gameObject;
	
	findShadowPlane = matchTwo.transform.parent.gameObject.GetComponentsInChildren (Transform);
	
	for (var shadowPlane : Transform in findShadowPlane) 
	{	
		if (shadowPlane.gameObject.name == "shadowPlane(Clone)")
		{
    		thisShadowPlaneTwo = shadowPlane.gameObject;
		}
	}
	
	matchTwo.animation.Play("reveal");
	
	cardFlipUp.Play();
	
	yield new WaitForSeconds (0.2);
	
	thisShadowPlaneTwo.renderer.enabled = false;
	
	if (matchOne == matchTwo) 
	{
		return;
	}

	matchTwo.animation.Play("reveal");
	
	yield new WaitForSeconds (0.2);
	
	thisShadowPlaneTwo.renderer.enabled = false;
	
	// Wait for the animation to have finished
	
	yield WaitForSeconds (hit.transform.gameObject.animation.clip.length);
	
	if (matchOne.name == matchTwo.name)
	{
		yield new WaitForSeconds (0.5);
		
		Destroy (matchOne);
		Destroy (matchTwo);

		cardsLeft -= 2;
		score += (timeTotal - (timeTotal - timeLeft));
		scoreGUI.text = "" + score;
		
		// Instantiate Particles if the two cards match and Destroy them 2 seconds later...
		
		var poofOne = Instantiate (particlePoof, matchOne.transform.position, Quaternion.identity);
		var poofTwo = Instantiate (particlePoof, matchTwo.transform.position, Quaternion.identity);
		
		matchSound.Play();
		
		Destroy (poofOne, 3.5);
		Destroy (poofTwo, 3.5);
	}
	
	else
	{
		yield new WaitForSeconds (0.5);
		
		matchOne.animation.Play("hide");
		matchTwo.animation.Play("hide");
		
		cardFlipDown.Play();
		
		yield new WaitForSeconds (matchTwo.animation["hide"].length/1.2);
	
		thisShadowPlaneOne.renderer.enabled = true;
		thisShadowPlaneTwo.renderer.enabled = true;
	}
	
	matchOne = null;
	matchTwo = null;
}

function gameWon ()
{
	// Activate "You Win" GUI if all cards are gone...
	
	winGUI.gameObject.SetActive(true);
	
	matchSound.pitch = 0.5;
	matchSound.Play();
	
	yield new WaitForSeconds (3);
	Destroy (this);
}

function gameLost ()
{
	// Activate "Game Over" GUI if time runs out...
	
	loseGUI.gameObject.SetActive(true);
	yield WaitForSeconds (3);
	Destroy (this);
}