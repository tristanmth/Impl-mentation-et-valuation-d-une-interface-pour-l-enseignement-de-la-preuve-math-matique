
// Début de cloture, afin qu'aucune fonction définit ici puisse fuitter à part via l'objet tabvar.
(function (tabvar) {

// Renvoit un message d'erreur interne conforme à l'API.
function internal_error (msg) {
	return [1.9, "Error: " + msg] ;
}

const ok = 2 ;

// Renvoit k(r) lorsque r = [ok, ...].
function bind (r, k) {
	if (r[0] === ok) return k (r) ;
	else return r ;
}

// Comme bind, mais effectue un throw en cas d'erreur avec le résultat.
function bind_throw (r, k) {
	if (r[0] === ok) return k (r) ;
	else throw r ;
}

// Cas spécial de bind où on n'utilise que la première valeur de r.
function bind_val (r, k) {
	return bind (r, r => k (r[1])) ;
}

// Définit une nouvelle fonction à ajouter à tabvar lors de l'initialisation.
function define_new_function (name, f) {
	let init = tabvar.init ;

	tabvar.init = () =>
		bind (init (), r => {
			if (tabvar[name] !== undefined){
				return internal_error ("Redefinition of internal function " + name) ;
			}

			tabvar[name] = f ;
			return r ;
		}) ;
}

// Essaye de trouver des valeurs de x qui annulent l'expression e.
define_new_function ("roots", (env, x, e) =>
	// En pratique, tabvar.interesting_values essaye de s'intéresser aux racines de l'expression,
	// et donc filtrer ces dernières est une bonne stratégie pour obtenir des zéros possibles.
	bind_val (tabvar.interesting_values (env, x, e), vs => {
		try {
			let v ;
			let roots = [] ;
			while (v = vs.pop ()) {
				bind_throw (tabvar.replace (env, e, x, v), r =>
					bind_throw (tabvar.compare_values (env, r[1], "0"), r => {
						if (r[1] === "=") roots.push (v) ;
					})) ;
			}
			return [ok, roots] ;
		} catch (r) { return r ; }
	})) ;

// Indique si le signe d'une expression est positif (zéro étant considéré positif).
define_new_function ("is_positive", (env, e) =>
	bind_val (tabvar.compare_values (env, e, "0"), c => {
		switch (c){
			case ">":
			case "=":
				return [ok, true] ;
			case "<":
				return [ok, false] ;
			case "?":
				// Cas embêtant où on ne sait pas. // Peut-être devrait-on renvoyer 2.1 plutôt que 2 dans ces cas là ?
				return [ok, "?"] ;
			default:
				return internal_error ("Unknown returned value by tabvar.compare_values: " + c) ;
		}
	})) ;

// Indique si v est une valeur interdite de la fonction f.
define_new_function ("valeur_interdite", (env, v, f) =>
	bind_val (tabvar.fresh (env, "x"), x =>
		bind_val(tabvar.suppose_var (env, x), env_with_x =>
			bind_val (tabvar.suppose (env_with_x, x + " = " + v), env_with_x =>
				bind_val (tabvar.defined (env_with_x, f + " (" + x + ")"), def => {
					switch (def){
						case "y":
							return [ok, true] ;
						case "n":
							return [ok, false] ;
						case "?":
							return [ok, "?"] ;
						default:
							return internal_error ("Unknown returned value by tabvar.defined: " + def) ;
					}
				}))))) ;

// Indique si v est un extremum local de f.
define_new_function ("extremum_local", (env, v, f) =>
	bind_val (tabvar.fresh (env, "x"), x =>
		bind_val (tabvar.suppose_var (env, x), env_with_x =>
			bind_val (tabvar.deriv (env_with_x, f + " (" + x + ")", x), df =>
				bind_val (tabvar.deriv (env_with_x, df, x), ddf =>
					bind_val (tabvar.suppose (env_with_x, x + " = " + v), env_with_x =>
						bind_val (tabvar.compare_values (env_with_x, df, "0"), c => {
							switch (c) {
								case "?":
									return [ok, "?"] ;
								case "=":
									return bind_val (tabvar.compare_values (env_with_x, ddf, "0"), c => {
										switch (c) {
											case "<":
											case ">":
												return [ok, true] ;
											case "=":
											case "?":
												return [ok, "?"] ;
											default:
												return internal_error ("Unknown returned value by tabvar.compare_values: " + c) ;
										}
									}) ;
								case "<":
								case ">":
									return [ok, false] ;
								default:
									return internal_error ("Unknown returned value by tabvar.compare_values: " + c) ;
							}
						}))))))) ;

// Indique le signe de la dérivée de f à la valeur v.
define_new_function ("signe_deriv", (env, v, f) =>
	bind_val (tabvar.fresh (env, "x"), x =>
		bind_val (tabvar.suppose_var (env, x), env_with_x =>
			bind_val (tabvar.deriv (env_with_x, f + " (" + x + ")", x), df =>
				bind_val (tabvar.suppose (env_with_x, x + " = " + v), env_with_x =>
					bind_val (tabvar.is_positive (env_with_x, df), s => {
						switch (s) {
							case "?":
								return [ok, "?"] ;
							case true:
								return [ok, "+"] ;
							case false:
								return [ok, "-"] ;
							default:
								return internal_error ("Unknown returned value by tabvar.is_positive: " + s) ;
						}
					})))))) ;

// Fermeture de la cloture.
}) (tabvar) ;

