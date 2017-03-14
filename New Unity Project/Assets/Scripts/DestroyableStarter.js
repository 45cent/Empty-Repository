public var maxHitpoints = 100.0f;
private var currentHitpoints : float;
public var collectablePrefabs : Transform[];

function Start () {
	currentHitpoints = maxHitpoints; 
}

function TakeDamage(damage : float){
    // Decrease hit points by damage
    currentHitpoints-=damage;
    // if hit points have reached zero
    if(currentHitpoints<=0){

        var col = GetComponent(Collider2D);
        if (collectablePrefabs != null) {
            for (var prefab : Transform in collectablePrefabs) {
				if (prefab != null) { Instantiate(prefab,new Vector3(transform.position.x,
                transform.position.y+1,
                transform.position.z), Quaternion.identity);
                // Create a new instance of the prefab
                }
           }
        } 
    Destroy(gameObject);
}
}