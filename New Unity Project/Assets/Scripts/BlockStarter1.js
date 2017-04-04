#pragma strict

public var tile : GameObject;

function OnCollisionEnter2D (collision : Collision2D) {
/*
	// Try to get the UseEquipment component from the object the block collides with ...
	var equipmentManager = collision.gameObject.GetComponent(UseEquipmentStarter);
	
	// if the UseEquipment component exists
	if (equipmentManager != null) {

		// Call the SetCurrentItem function and pass it a reference to this block.
		equipmentManager.SetCurrentItem(tile);

		// Destroy this block
		Destroy (gameObject);
	}
*/
	var inventoryManager = collision.gameObject.GetComponent(InventoryManager);

	if (inventoryManager != null) {
		if (inventoryManager.AddToInventory (tile)) {
			Destroy (gameObject);
		}
	}
}
