// When all the cards have been Instantiated they will play an Animation and then Destroy this script to reduce overhead...

private var thisShadowPlane : GameObject;

function Start ()
{            
    var findShadowPlane : Array = transform.parent.gameObject.GetComponentsInChildren (Transform);

    for(var i=0;i<findShadowPlane.Count;i++)
    {
        if((findShadowPlane[i] as Transform).gameObject.name.Equals("shadowPlane(Clone)"))
        {
            thisShadowPlane = (findShadowPlane[i] as Transform).gameObject;
        }
    }
    
    yield StartCoroutine ("reveal");
    
    Destroy (this);
}

function reveal()
{		
	yield new WaitForSeconds (1.0);
	
	animation.Play("reveal");
	
	yield new WaitForSeconds (0.2);
	
	thisShadowPlane.renderer.enabled = false;
	
	// Wait for the animation to have finished
	
	yield new WaitForSeconds (animation["reveal"].length);
	
	//animation.Pause("reveal");
	
	yield new WaitForSeconds (1.5);
	
	animation.Play("hide");
		
	yield new WaitForSeconds (animation["hide"].length/1.2);
	
	thisShadowPlane.renderer.enabled = true;
}
