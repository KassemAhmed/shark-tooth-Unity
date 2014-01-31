// When all the cards have been Instantiated they will play an Animation and then Destroy this script to reduce overhead...


function Start ()
{            

	// Start the fuction called reveal (??)
    yield StartCoroutine ("reveal");
    
    // Destroy this script once that has been done
    Destroy (this);
}

function reveal()
{		
	yield new WaitForSeconds (1.0);
	
	animation.Play("reveal");
	
	yield new WaitForSeconds (0.2);
	
	
	// Wait for the animation to have finished
	
	yield new WaitForSeconds (animation["reveal"].length);
	
	//animation.Pause("reveal");
	
	yield new WaitForSeconds (1.5);
	
	animation.Play("hide");
		
	yield new WaitForSeconds (animation["hide"].length/1.2);
	
}
