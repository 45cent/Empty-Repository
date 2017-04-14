#pragma strict

public var speed : float;
public var gravity : float;
public var jumpSpeed : float;
public var wanderDelay : float;
public var jumpDelay : float;
public var target : Transform;
public var attackDistance : float;
public var targetLayer : LayerMask;

private var nextMove : float;
private var nextJump : float;
private var verticalSpeed : float;
private var grounded : boolean;
private var facingRight = true;
private var startPosition : Vector3;
private var targetDistance : float;
private var canAttack : boolean;

function Start () {
	grounded = true;
	nextMove = 0;
	nextJump = 0;
	startPosition = transform.position;
}

function Update () {

	if (transform.position.y < -30) {
		transform.position = startPosition;
	}

	//var h = Input.GetAxis("Horizontal");
	var h = AI_Move();
	transform.position.x += h * speed * Time.deltaTime;

	if (grounded) {
		//if (Input.GetButton("Jump")) {
		if (TimeToJump()) {
			grounded = false;
			verticalSpeed = jumpSpeed;
		}
	} else {		
		verticalSpeed -= gravity * Time.deltaTime;
		transform.position.y += verticalSpeed * Time.deltaTime;
	}

	if (h > 0 && !facingRight) {
		Flip();
	} else if (h < 0 && facingRight) {
		Flip();
	}
}

private function Flip() {
	facingRight = !facingRight;
    transform.localScale.x *= -1;
}

private function AI_Move() : int {
	var direction = 0;
	if (facingRight) { 
		direction = 1;
	} else { 
		direction = -1;
	}

	// Get distance & direction to target
	var currentDistance = Vector3.Distance(target.position, transform.position);
	var rayDirection = target.position - transform.position;

	// if we see player, move toward player
	var hit = Physics2D.Linecast(transform.position, target.position, targetLayer.value);
	if (hit.collider != null && currentDistance <= attackDistance)
	{
		canAttack = true;
		direction = Mathf.Sign(rayDirection.x);
		return direction;
	} else { // If we cannot see player, then move randomly
		canAttack = false;
		if (Time.time > nextMove) {		
			direction *= -1;
			//nextMove = Time.time + wanderDelay;
			nextMove = Time.time + Random.Range(1.0, wanderDelay);
		}
	}

	return direction;
}

private function TimeToJump() : boolean {		
	return false;
}

function OnCollisionStay2D(other : Collision2D) {
	if (other.gameObject.layer == LayerMask.NameToLayer("Ground")) {
		verticalSpeed = 0;
		grounded = true;
	}
}

function OnCollisionExit2D(other : Collision2D) {
	grounded = false;
}
