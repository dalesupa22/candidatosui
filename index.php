<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
	<link rel="stylesheet" type="text/css" href="/css/app.css">
</head>
<body>
	
	<section class="section hero is-fullheight" id="home">
		<!---<nav class="navbar is-transparent">
		  <div class="navbar-brand">
		    <a class="navbar-item" href="#">
		      <img src="http://via.placeholder.com/112x28" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
		    </a>
		    <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
		      <span></span>
		      <span></span>
		      <span></span>
		    </div>
		  </div>

		  <div id="navbarExampleTransparentExample" class="navbar-menu">
		    <div class="navbar-start">
		      <a class="navbar-item" href="https://bulma.io/">
		        Home
		      </a>
		      <div class="navbar-item has-dropdown is-hoverable">
		        <a class="navbar-link" href="/documentation/overview/start/">
		          Docs
		        </a>
		        <div class="navbar-dropdown is-boxed">
		          <a class="navbar-item" href="/documentation/overview/start/">
		            Overview
		          </a>
		          <a class="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">
		            Modifiers
		          </a>
		          <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
		            Columns
		          </a>
		          <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">
		            Layout
		          </a>
		          <a class="navbar-item" href="https://bulma.io/documentation/form/general/">
		            Form
		          </a>
		          <hr class="navbar-divider">
		          <a class="navbar-item" href="https://bulma.io/documentation/elements/box/">
		            Elements
		          </a>
		          <a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
		            Components
		          </a>
		        </div>
		      </div>
		    </div>

		    <div class="navbar-end">
		      <div class="navbar-item">
		        <div class="field is-grouped">
		          <p class="control">
		            <a class="button is-primary" href="https://github.com/jgthms/bulma/releases/download/0.7.1/bulma-0.7.1.zip">
		              <span class="icon">
		                <i class="fas fa-download"></i>
		              </span>
		              <span>registrate</span>
		            </a>
		          </p>
		        </div>
		      </div>
		    </div>
		  </div>
		</nav>-->
		<div class="hero-head" id="progress">	
			<div class="container">
				<div class="columns is-centered">
					<div class="is-two-thirds column has-text-centered">	
						<small>Pregunta <span>1</span> de <span>10</span></small>
						<progress class="progress is-small" value="0" max="100">
						</progress>
					</div>
				</div>
			</div>
		</div>
		<div class="hero-body">
			<div class="container" id="intro">
				<div class="columns is-multiline is-centered has-text-centered">
					<div class="is-two-thirds column">
						<h2 class="title is-1">Formulario De Problematicas</h2>
					</div>
					<div class="is-two-thirds column">
						<br>
						<p class="content is-medium">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt temporibus impedit magnam veniam itaque eos soluta neque ut, qui hic amet, sunt quod, labore, officiis. Expedita unde repellendus in odio.</p>
						<div class="buttons is-centered "><a href="#" class="button is-primary is-large intro is-rounded">empezar formulario</a></div>
					</div>
				</div>
			</div>
			<form action="" id="formulario">
				<div class="item" id="q1">
					<div class="container">
						<div class="columns is-centered is-multiline">
							<div class="is-two-thirds column">
								<h2 class="title is-4">Lorem impsum pregunta</h2>
								<p class="content desc is-small">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis tempora inventore quidem a ad. Quas dolores quia id cupiditate officia corporis asperiores, deleniti quasi fugit, unde, aperiam esse a numquam!</p>
								<br>
							</div>
							<div class="is-two-thirds column">
								<div class="field">
									<div class="selector">
										<select name="motive" hidden>
											<option value="prueba0">blabla</option>
											<option value="prueba1">blabla</option>
											<option value="prueba2">blabla</option>
										</select>
										<div>
											<div class="option motive problematica" data-value="prueba0">
												<div></div>
												<p class="has-text-centered">Problematica</p>
											</div>
										</div>
										<div>
											<div class="option motive peticion" data-value="prueba1">
												<div></div>
												<p class="has-text-centered">Petición</p>
											</div>
										</div>
										<div>
											<div class="option motive denuncia" data-value="prueba2">
												<div></div>
												<p class="has-text-centered">Denuncia</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="item" id="q2">
					<div class="container">
						<div class="columns is-centered is-multiline">
							<div class="is-two-thirds column">
								<h2 class="title is-3">Lorem impsum pregunta2</h2>
								<p class="content desc">22Lorem ipsum dolor sit amet, consectetur adipisicing elit. Perferendis tempora inventore quidem a ad. Quas dolores quia id cupiditate officia corporis asperiores, deleniti quasi fugit, unde, aperiam esse a numquam!</p>
								<br>
							</div>
							<div class="is-two-thirds column">
								
							</div>
						</div>
					</div>
				</div>
			</form>
		</div>
		<div class="hero-foot" id="controls">
			<div class="container">
				<div class="columns is-centered">
					<div class="is-two-thirds column">
						<div class="level">
							<div class="level-item">
								<a class="button is-large is-rounded circled is-linkcolor" id="previous_question">
								    <span class="icon is-large">
								      <i class="fas fa-chevron-left "></i>
								    </span>
								</a>
							</div>
							<div class="level-item">
								<a class="button is-large is-rounded circled right is-linkcolor" id="next_question">
								    <span class="icon is-large">
								      <i class="fas fa-chevron-right "></i>
								    </span>
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="section bigger">
		<div class="container">
			<div class="columns">
				<div class="is-half column">
					<h1 class="title is-1">Lorem ipsum joder</h1>
					<p class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae aliquid minus quas omnis, nisi unde dicta aperiam quaerat aliquam ut provident culpa iure neque ducimus voluptatum, veritatis dolore, earum suscipit.</p>
					<a href="" class="button is-big is-primary">ver planes</a>
				</div>
				<div class="is-half column">
					<img src="/img/data.png" alt="">
				</div>
			</div>
		</div>
	</section>
	<section class="section" id="contact">
		<div class="container">
			<div class="columns is-variable is-8 is-vcentered">
				<div class="is-half column">
					<div class="arrow"></div>
					<form action="" class="box">
						<h3 class="title is-3">Dejanos tus datos</h3>
						<p class="content">Hablemos de como candiDATOS te puede ayudar a gobernar mejor</p>
						<div class="field">
						  <label class="label">Nombre Completo</label>
						  <div class="control">
						    <input class="input" type="text" placeholder="Text input">
						  </div>
						</div>
						<div class="field">
						  <label class="label">Correo Electronico</label>
						  <div class="control has-icons-left has-icons-right">
						    <input class="input" type="email" placeholder="hello@obama.com" value="">
						    <span class="icon is-small is-left">
						      <i class="fas fa-envelope"></i>
						    </span>
						  </div>
						</div>
					  <div class="field">
					  	<div class="control">
					  		<a href="#" type="submit" class="button is-primary">enviar mensaje</a>
					  	</div>
					  </div>
					</form>
				</div>
				<div class="is-half column">
					<h4 class="title is-4">O por estos medios</h4>
					<div class="level">
						<div class="level-left">
							<div class="level-item">
								<div class="icon is-medium"><i class="fas fa-envelope fa-2x"></i></div>
							</div>
							<div class="level-item">
								<a href="mailto:correo@candidatos.com">correo@candidatos.com</a>
							</div>
						</div>
					</div>
					<div class="level content">
						<div class="level-left">
							<div class="level-item">
								<div class="icon is-medium"><i class="fas fa-phone fa-2x"></i></div>
							</div>
							<div class="level-item">
								<a href="">+57 3013668888</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
	<section class="section">
		<div class="container">
			<div class="columns is-centered">
				<div class="is-half column box">
					<h2 class="title is-2">Formulario</h2>
					<p class="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellendus consequatur nisi accusamus, voluptates temporibus mollitia beatae assumenda nihil sunt, minus ab, in quis eveniet laudantium eaque facilis sequi! Placeat, esse.</p>
					<form action="">
						<div class="field">
							<label class="label">¿Crees que la politica te ayuda a ser feliz?</label>
						  	<div class="control">
							  <label class="radio" for="q1a1">
							    <input type="radio" name="answer" id="rad1">
							    <span class="icon is-large">
							    	<i class="far fa-smile fa-3x"></i>
							    </span>
							  </label>
							  <label class="radio" for="q1a2">
							    <input type="radio" name="answer" id="rad2">
							    <span class="icon is-large">
							    	<i class="far fa-frown fa-3x"></i>
							    </span>
							  </label>
							</div>
						</div>
						<br>
						<div class="field">
							<label class="label">¿En que ciudad y barrio/comuna/localidad vives?</label>
						  	<div class="control">
							  <div class="select">
							    <select>
							      <option>Bogota</option>
							      <option>Barranquilla</option>
							      <option>Medellin</option>
							    </select>
							  </div>
							</div>
						</div>
						<hr>
						<div class="field">
							<div class="control">
								<a href="#" class="button is-primary is-medium">enviar <span>formulario</span>
									<span class="icon is-small">
								      <i class="fas fa-chevron-right"></i>
								    </span>
								</a>
						</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</section>
	<footer class="footer">
	  <div class="container">
	  	<div class="columns is-centered">
	  		<div class="is-full column">
	  			<div class="level">
	  				<div class="level-item">
	  					<h5 class="subtitle is-6 is-uppercase">
	  						<a href="">el equipo</a>
	  					</h5>
	  				</div>
	  				<div class="level-item">
	  					<h5 class="subtitle is-6 is-uppercase">
	  						<a href="">el equipo</a>
	  					</h5>
	  				</div>
	  			</div>
	  		</div>
	  	</div>
	    <div class="content has-text-centered">
	      <p>
	        <strong>© CandiDATOS</strong> Todos Los Derechos Reservados
	      </p>
	    </div>
	  </div>
	</footer>
	<script
  src="https://code.jquery.com/jquery-3.3.1.min.js"
  integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8="
  crossorigin="anonymous"></script>
  <script id="__bs_script__">//<![CDATA[
    document.write("<script async src='http://HOST:3000/browser-sync/browser-sync-client.js?v=2.24.4'><\/script>".replace("HOST", location.hostname));
//]]></script>
	<script src="/js/app.js"></script>
</body>
</html>