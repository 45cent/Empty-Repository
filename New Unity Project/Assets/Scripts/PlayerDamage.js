#pragma strict

public var maxHealth : float;
private var currentHealth : float;
public var healthSlider : UI.Slider;
public var spawnPoint : Transform;
public var bloodPrefab : Transform;

function Start () {
    currentHealth = maxHealth; 
}
function OnCollisionEnter2D (collision : Collision2D) {
	if (collision.gameObject.tag == "Enemy") {
		if (bloodPrefab != null) {
			Instantiate (bloodPrefab, collision.contacts[0].point, Quaternion.identity); 
		}
		currentHealth -= 10.0f;

		if (currentHealth <= 0) {
			currentHealth = maxHealth;
			healthSlider.value = 1;
			transform.position = spawnPoint.position;
		} else {
			healthSlider.value = currentHealth / maxHealth;
		}
	}
}