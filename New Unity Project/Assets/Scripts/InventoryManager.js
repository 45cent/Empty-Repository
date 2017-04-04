#pragma strict

public var hudIcons : UI.Image[];
public var hudLabels : UI.Text[];

private var tiles : GameObject[];
private var counts : int[];

function Start () {
	tiles = new GameObject[hudIcons.length];
	counts = new int[hudIcons.length];

	for (var i = 0; i < hudIcons.length; i ++) {
		tiles[i] = null;
		counts[i] = 0;
		hudIcons[i].sprite = null;
		hudLabels[i].text = "0";
	}
}

function AddToInventory (tile : GameObject) : boolean
{
	// search through for items I already have
	var i : int;
	for (i = 0; i < tiles.length; i ++) {
		if (tiles[i] == tile) {
			counts[i] ++;
			hudLabels[i].text = "" + counts[i];
			return true;
		}
	}

	for (i = 0; i < tiles.length; i ++) {
		if (tiles[i] == null || counts[i] == 0) {
			tiles[i] = tile;
			hudIcons[i].sprite = tile.GetComponent(SpriteRenderer).sprite;
			counts[i] = 1;
			hudLabels[i].text = "" + counts[i];
			return true;
		}
	}

	return false;
}

function RemoveFromInventory (tile : GameObject) : boolean 
{
	var i : int;
	for (i = 0; i < tiles.length; i ++) {
		if (tiles[i] == tile) {
			// Do something here.
		}
	}

	return true;
}

function SetItemActive (index : int) {
	if (index < 0 || index >= tiles.length) {
		Debug.LogError ("You've done something wrong!");
		return;
	}
	var useEquipment = GetComponent(UseEquipmentStarter1);
	useEquipment.SetCurrentItem (tiles[index]);
}