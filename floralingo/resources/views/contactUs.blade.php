<!DOCTYPE html>
<html data-bs-theme="light" lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
  <title>Floralingo-userSide</title>
  <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css?h=643a7e2aa853615822bcdb4e74d86ddb" />
  <link rel="stylesheet" href="/assets/css/styles.min.css?h=b5eeab7d6d7679d49f9fdc179e0b2cb4" />
</head>

<body>
  <!-- Start: Navbar Centered Links -->
  <nav class="navbar navbar-expand-md sticky-top bg-secondary bg-gradient d-md-flex py-3 px-0 px-xl-5">
    <div class="container-fluid">
      <a class="navbar-brand d-flex align-items-center" href="{{ route('userHome') }}"><span
          class="bs-icon-md bs-icon-rounded bs-icon-semi-white d-flex justify-content-center align-items-center me-2 bs-icon"><img
            class="img-fluid"
            src="/assets/img/FloraLingo%20Logo.png?h=4dbc432d3ae0beccfe73b2897643447d" /></span><span><strong>FLORALINGO</strong></span></a><button
        data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-3">
        <span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navcol-3">
        <ul class="navbar-nav mx-auto">
          <li class="nav-item dropdown">
            <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">Categories</a>
            <div class="dropdown-menu">
              <a class="dropdown-item" href="{{ route('userHome') }}#NewRelease">New Release</a><a class="dropdown-item"
                href="{{ route('userHome') }}#BestSellers">Best Sellers</a><a class="dropdown-item" href="{{ route('userHome') }}#AllProducts">All Products</a>
            </div>
          </li>
          
          <li class="nav-item" style="height: 100%">
            <a class="nav-link" href="{{ route('userHome') }}#AllProducts">Shop</a>
          </li>
          <li class="nav-item" style="height: 100%">
            <a class="nav-link" href="/dictionary">Dictionary</a>
          </li>
          <li class="nav-item" style="height: 100%">
            <a class="nav-link" href="/contactUs">Contact Us</a>
          </li>
          <li class="nav-item"><a class="nav-link" href="/faqs">FAQs</a></li>
          <li class="nav-item">
            <a class="nav-link d-flex" href="/favorites  "><svg xmlns="http://www.w3.org/2000/svg" width="1em"
                height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
                stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-heart me-2"
                style="font-size: 18px; color: var(--bs-primary)">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572"></path>
              </svg>Favorites</a>
          </li>
          <li class="nav-item">
            <a class="nav-link d-flex" href="/cart"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                stroke-linejoin="round" class="icon icon-tabler icon-tabler-shopping-cart me-2"
                style="font-size: 18px; color: var(--bs-primary)">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M17 17h-11v-14h-2"></path>
                <path d="M6 5l14 1l-1 7h-13"></path>
              </svg>Cart</a>
          </li>
        </ul>
        <a class="btn btn-outline-primary btn-lg" role="button" href="/profile"
          style="height: fit-content; width: fit-content; font-size: inherit"><svg xmlns="http://www.w3.org/2000/svg"
            width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
            stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-user me-2"
            style="font-size: 18px">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
          </svg>Profile</a>
      </div>
    </div>
  </nav>
  <!-- End: Navbar Centered Links -->
  <section class="bg-body-tertiary mb-5">
    <div class="container py-4 px-4 pt-5">
      <h1 class="display-3 fw-bold d-xxl-flex justify-content-xxl-start mb-0">
        Contact Us
      </h1>
      <ol class="breadcrumb d-xxl-flex px-0" style="border-style: none; box-shadow: 0px 0px">
        <li class="breadcrumb-item">
          <a href="/userHome"><span><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
                stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icon-tabler-home fs-5 pe-0 me-2">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
              </svg>Home</span></a>
        </li>
        <li class="breadcrumb-item">
          <a href="/contactUs"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
              stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"
              class="icon icon-tabler icon-tabler-phone fs-5 pe-0 me-2">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path
                d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2">
              </path>
            </svg><span>Contact Us</span></a>
        </li>
      </ol>
    </div>
  </section>
  <section id="contactUs" style="background: transparent" class="mt-0 pt-1 py-xl-0">
    <!-- Start: about us -->
    <div class="container-lg d-xxl-flex py-4 py-xl-5 px-4">
      <div class="row my-5 ms- px-3 mx-0">
        <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 mb-3 px-4">
          <div>
            <h3 class="fs-1 fw-bold text-center text-sm-start text-primary mb-3">
              <span class="text-muted">We are always ready</span><br />for
              your questions
            </h3>
            <p class="w-lg-50">
              Have questions or need assistance? We're here to help! Reach out
              to us for inquiries, orders, or feedback—our team is ready to
              make your floral experience exceptional.
            </p>
          </div>
          <div>
            <div class="d-flex align-items-center p-3">
              <div
                class="bs-icon-md bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16"
                  class="bi bi-telephone">
                  <path
                    d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z">
                  </path>
                </svg>
              </div>
              <div class="px-2">
                <h6 class="mb-0">Phone</h6>
                <p class="mb-0">+639 293 406 082</p>
              </div>
            </div>
            <div class="d-flex align-items-center p-3">
              <div
                class="bs-icon-md bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16"
                  class="bi bi-envelope">
                  <path
                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z">
                  </path>
                </svg>
              </div>
              <div class="px-2">
                <h6 class="mb-0">Email</h6>
                <p class="mb-0">floralingo@gmail.com</p>
              </div>
            </div>
            <div class="d-flex align-items-center p-3">
              <div
                class="bs-icon-md bs-icon-rounded bs-icon-primary d-flex flex-shrink-0 justify-content-center align-items-center d-inline-block bs-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16"
                  class="bi bi-pin">
                  <path
                    d="M4.146.146A.5.5 0 0 1 4.5 0h7a.5.5 0 0 1 .5.5c0 .68-.342 1.174-.646 1.479-.126.125-.25.224-.354.298v4.431l.078.048c.203.127.476.314.751.555C12.36 7.775 13 8.527 13 9.5a.5.5 0 0 1-.5.5h-4v4.5c0 .276-.224 1.5-.5 1.5s-.5-1.224-.5-1.5V10h-4a.5.5 0 0 1-.5-.5c0-.973.64-1.725 1.17-2.189A5.921 5.921 0 0 1 5 6.708V2.277a2.77 2.77 0 0 1-.354-.298C4.342 1.674 4 1.179 4 .5a.5.5 0 0 1 .146-.354zm1.58 1.408-.002-.001.002.001m-.002-.001.002.001A.5.5 0 0 1 6 2v5a.5.5 0 0 1-.276.447h-.002l-.012.007-.054.03a4.922 4.922 0 0 0-.827.58c-.318.278-.585.596-.725.936h7.792c-.14-.34-.407-.658-.725-.936a4.915 4.915 0 0 0-.881-.61l-.012-.006h-.002A.5.5 0 0 1 10 7V2a.5.5 0 0 1 .295-.458 1.775 1.775 0 0 0 .351-.271c.08-.08.155-.17.214-.271H5.14c.06.1.133.191.214.271a1.78 1.78 0 0 0 .37.282">
                  </path>
                </svg>
              </div>
              <div class="px-2">
                <h6 class="mb-0">Location</h6>
                <p class="mb-0">RAJIV Company, Side Street</p>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6 col-lg-6 col-xl-6 col-xxl-6 d-md-flex align-items-md-center px-sm-4">
          <div class="card d-md-flex justify-content-md-center mx-0 px-3 py-4" style="
                border-radius: 26px;
                background: #fff6f9;
                border-style: none;
                box-shadow: 0px 0px;
                height: 100%;
                width: 100%;
              ">
            <div>
              <form class="p-3 p-xl-4" onsubmit="openGmail(event)">

                <div class="mb-3">
                  <input class="form-control" type="text" id="name-1" name="name" placeholder="Name" required />
                </div>

                <div class="mb-3">
                  <input class="form-control" type="email" id="email-2" name="email" placeholder="Email" required />
                </div>

                <div class="mb-3">
                  <input class="form-control" type="text" id="subject-1" name="subject" placeholder="Subject"
                    required />
                </div>

                <div class="mb-3">
                  <textarea class="form-control" id="message-2" name="message" rows="6" placeholder="Message"
                    required></textarea>
                </div>

                <div>
                  <button class="btn btn-primary d-block w-100" type="submit">
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End: about us -->
  </section>
  <!-- Start: Footer Multi Column -->
  <footer>
    <div class="container py-4 py-lg-5">
      <div class="row justify-content-center">
        <!-- Start: Sections -->
        <div class="col-sm-5 col-md-5 col-lg-4 text-center text-lg-start d-flex flex-column item">
          <h3 class="fs-6">Sections</h3>
          <ul class="list-unstyled">
            <li><a class="link-dark" href="{{ route('userHome') }}#NewRelease">Featured Products</a></li>
            <li><a class="link-dark" href="{{ route('userHome') }}#AllProducts">Our Products</a></li>
            <li>
              <a class="link-dark" href="/dictionary">Flower Dictionary</a>
            </li>
          </ul>
        </div>
        <!-- End: Sections -->
        <div class="col-sm-5 col-md-5 col-lg-4 text-center text-lg-start d-flex flex-column item">
          <ul class="list-unstyled">
            <li><a class="link-dark" href="/faqs">FAQs</a></li>
            <li class="text-dark">
              <a class="link-dark" href="{{  route('userHome') }}#">About Us</a>
            </li>
            <li class="text-dark">
              <a class="link-dark" href="/contactUs">Contact Us</a>
            </li>
          </ul>
        </div>
        <!-- Start: Social Icons -->
        <div
          class="col-lg-3 text-center text-lg-start d-flex flex-column align-items-center order-first align-items-lg-start order-lg-last item social">
          <div class="fw-bold d-flex align-items-center mb-2">
            <span
              class="bs-icon-sm bs-icon-rounded bs-icon-semi-white d-flex justify-content-center align-items-center bs-icon me-2"><img
                class="img-fluid"
                src="/assets/img/FloraLingo%20Logo.png?h=4dbc432d3ae0beccfe73b2897643447d" /></span><span>Brand</span>
          </div>
          <p class="text-muted copyright">
            FloraLingo: Where Every Bloom Tells a Story
          </p>
        </div>
        <!-- End: Social Icons -->
      </div>
      <hr />
      <div class="d-flex justify-content-between align-items-center pt-3">
        <p class="text-muted mb-0">Copyright © 2025 FLORALINGO</p>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16"
              class="bi bi-facebook">
              <path
                d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951">
              </path>
            </svg>
          </li>
          <li class="list-inline-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16"
              class="bi bi-twitter">
              <path
                d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15">
              </path>
            </svg>
          </li>
          <li class="list-inline-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" viewBox="0 0 16 16"
              class="bi bi-instagram">
              <path
                d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334">
              </path>
            </svg>
          </li>
        </ul>
      </div>
    </div>
  </footer>
  <!-- End: Footer Multi Column -->
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="/assets/js/script.min.js?h=fffa086275a3e9d088e0d86eca965e31"></script>
  <script>
    function openGmail(event) {
      event.preventDefault(); // Prevent the form from submitting

      // Get the form data
      var name = document.getElementById('name-1').value;
      var email = document.getElementById('email-2').value;
      var subject = document.getElementById('subject-1').value;
      var message = document.getElementById('message-2').value;

      // Construct the Gmail URL with pre-filled fields
      var gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1&to=jimm2022-9346-24541@bicol-u.edu.ph&su=' +
        encodeURIComponent(subject) +
        '&body=' + encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message);

      //gmail in new tab
      window.open(gmailUrl, '_blank');
    }
  </script>

</body>

</html>