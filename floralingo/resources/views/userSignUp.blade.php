<!doctype html>
<html data-bs-theme="light" lang="en">

<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
    <title>Floralingo-userSide</title>
    <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css?h=643a7e2aa853615822bcdb4e74d86ddb" />
    <link rel="stylesheet" href="/assets/css/styles.min.css?h=eeaa479574d11e6b1abf296a3cfc8914" />
</head>

<body>
    <section>
        <!-- Start: Articles Cards -->
        <div class="py-xl-5 container py-4">
            <div class="card d-flex flex-row-reverse" style="height: 675px; box-shadow: 0px 0px; border-radius: 20px">
                <img class="card-img-top d-block d-none d-lg-flex fit-cover w-100"
                    style="height: auto; max-width: inherit; border-radius: 0px; border-bottom-right-radius: 20px; border-top-right-radius: 20px"
                    src="/assets/img/signup.jpg" />
                <div class="card-body d-xl-flex p-4 px-5 py-5" style="width: 978.188px">
                    <section class="px-xxl-5 px-xl-4 px-md-5 px-lg-0 my-0 me-0 px-0">
                        <!-- Start: heading -->
                        <div class="mb-4">
                            <a class="navbar-brand d-flex justify-content-center align-items-center justify-content-xxl-center mb-3"
                                href="{{ route('userlanding') }}"><span
                                    class="bs-icon-md bs-icon-rounded bs-icon-semi-white d-flex justify-content-center align-items-center bs-icon me-2"><img
                                        class="img-fluid"
                                        src="/assets/img/FloraLingo%20Logo.png?h=4dbc432d3ae0beccfe73b2897643447d" /></span>
                                <h4 class="fw-bold mb-0">FLORALINGO</h4>
                            </a>
                            <h1 class="fw-bolder d-xl-flex mb-1">Create an account</h1>
                        </div>
                        <!-- End: heading -->
                        <div>
                            <form method="POST" action="{{ route('userSignUp') }}">
                                @csrf
                                <label class="form-label">Name</label>
                                <input class="form-control mb-3" type="text" name="name" placeholder="Full name"
                                    required value="{{ old('name') }}" />

                                <label class="form-label">Email address</label>
                                <input class="form-control mb-3" type="email" name="email"
                                    placeholder="email@example.com" required value="{{ old('email') }}" />

                                <!-- Display validation error for email -->
                                @if ($errors->has('email'))
                                    <div class="text-danger">{{ $errors->first('email') }}</div>
                                @endif

                                <label class="form-label">Password</label>
                                <input class="form-control mb-3" type="password" name="password" placeholder="Password"
                                    required />

                                <label class="form-label">Confirm Password</label>
                                <input class="form-control mb-4" type="password" name="password_confirmation"
                                    placeholder="Confirm Password" required />

                                <div class="mt-lg-3">
                                    <button class="btn btn-primary" type="submit" style="width: 100%">Create
                                        account</button>
                                </div>

                                <div class="mt-lg-3">
                                    <p class="d-xl-flex justify-content-xl-center" style="font-size: 13px">
                                        Already have an account?
                                        <span class="ms-2"><a class="link-primary" href="{{ route('userLogIn') }}">Log
                                                In</a></span>
                                    </p>
                                </div>
                            </form>


                        </div>
                    </section>
                </div>
            </div>
        </div>
        <!-- End: Articles Cards -->
    </section>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="/assets/js/script.min.js?h=fffa086275a3e9d088e0d86eca965e31"></script>
</body>

</html>