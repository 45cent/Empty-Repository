#pragma strict

function OnCollisionEnter2D (collision : Collision2D) {
	// Try to get the UseEquipment component from the object the block collides with ...
	var equipmentManager = collision.collider.GetComponent(UseEquipmentStarter);
	
	   //if the UseEquipment component exists
	if (equipmentManager != null) {
		// Call the SetCurrentItem function and pass it a reference to this block.
	    // Destroy this block
	    equipmentManager.SetCurrentItem(this.gameObject);
	    Destroy(gameObject);

	}
}
