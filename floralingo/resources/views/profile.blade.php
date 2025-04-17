<!DOCTYPE html>
<html data-bs-theme="light" lang="en">

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no" />
  <title>Floralingo-userSide</title>
  <link rel="stylesheet" href="/assets/bootstrap/css/bootstrap.min.css?h=643a7e2aa853615822bcdb4e74d86ddb" />
  <link rel="stylesheet" href="/assets/css/styles.min.css?h=4d9d198ba5cb12fc8261e19f52dc4579" />
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
                href="{{ route('userHome') }}#BestSellers">Best Sellers</a><a class="dropdown-item"
                href="{{ route('userHome') }}#AllProducts">All Products</a>
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
        <form action="{{ route('GenLogout') }}" method="POST"
          onsubmit="return confirm('Are you sure you want to log out?')">
          @csrf
          <button class="btn btn-outline-primary btn-lg" type="submit"
            style="height: fit-content; width: fit-content; font-size: inherit"><svg xmlns="http://www.w3.org/2000/svg"
              width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none"
              stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icon-tabler-user me-2"
              style="font-size: 18px">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
            </svg>Log Out</button>
        </form>

      </div>
    </div>
  </nav>
  <!-- End: Navbar Centered Links --><!-- Start: title -->
  <section class="bg-body-tertiary mb-5">
    <div class="container py-4 px-4 pt-5">
      <h1 class="display-3 fw-bold d-xxl-flex justify-content-xxl-start mb-0">
        My Profile
      </h1>
      <ol class="breadcrumb d-xxl-flex px-0" style="border-style: none; box-shadow: 0px 0px">
        <li class="breadcrumb-item">
          <a href="/userHome "><span><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"
                viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                stroke-linejoin="round" class="icon icon-tabler icon-tabler-home fs-5 pe-0 me-2">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M5 12l-2 0l9 -9l9 9l-2 0"></path>
                <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"></path>
                <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"></path>
              </svg>Home</span></a>
        </li>
        <li class="breadcrumb-item">
          <a href="/profile "><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
              stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"
              class="icon icon-tabler icon-tabler-user fs-5 pe-0 me-2">
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
              <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
            </svg><span>My Profile</span></a>
        </li>
      </ol>
    </div>
  </section>
  <!-- End: title -->
  <section>
    <div class="container">
      <div>
        <ul class="nav nav-tabs nav-justified d-grid d-sm-flex" role="tablist">
          <li class="nav-item" role="presentation">
            <a class="nav-link active fw-semibold" role="tab" data-bs-toggle="tab" href="#tab-1"><svg
                xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icon-tabler-user fs-5 pe-0 me-2">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"></path>
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
              </svg>My Account&nbsp;</a>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link fw-semibold" role="tab" data-bs-toggle="tab" href="#tab-2"><svg
                xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icon-tabler-map-pin fs-5 pe-0 me-2">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0"></path>
                <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z"></path>
              </svg>My Address&nbsp;</a>
          </li>
          <li class="nav-item" role="presentation">
            <a class="nav-link fw-semibold" role="tab" data-bs-toggle="tab" href="#tab-3"><svg
                xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" stroke-width="2"
                stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"
                class="icon icon-tabler icon-tabler-shopping-bag fs-5 pe-0 me-2">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path
                  d="M6.331 8h11.339a2 2 0 0 1 1.977 2.304l-1.255 8.152a3 3 0 0 1 -2.966 2.544h-6.852a3 3 0 0 1 -2.965 -2.544l-1.255 -8.152a2 2 0 0 1 1.977 -2.304z">
                </path>
                <path d="M9 11v-5a3 3 0 0 1 6 0v5"></path>
              </svg><strong>Purchase History</strong></a>
          </li>
        </ul>
        <div class="tab-content">
          <div class="tab-pane active mt-4" role="tabpanel" id="tab-1">
            <div class="card border-1" style="
                  border-radius: 20px;
                  padding-left: 24px;
                  padding-right: 24px;
                  box-shadow: 0px 0px;
                ">
              <div class="card-body justify-content-evenly my-4">
                <form method="POST" action="{{ route('change.profile') }}" class="mt-3">
                  @csrf
                  <div class="d-flex justify-content-between align-items-xxl-center mb-sm-4">
                    <h5 class="fw-bold mb-0">Personal Information</h5>
                    <button class="btn btn-outline-primary btn-lg" type="submit"
                      style="height: fit-content; width: fit-content; font-size: smaller;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
                        stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                        stroke-linejoin="round" class="icon icon-tabler icon-tabler-checks me-2"
                        style="font-size: 18px">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M7 12l5 5l10 -10"></path>
                        <path d="M2 12l5 5m5 -5l5 -5"></path>
                      </svg>
                      Save
                    </button>
                  </div>

                  <div class="d-grid d-sm-flex mb-3" style="width: 100%">
                    <div style="width: 100%" class="pe-0 me-3">
                      <label class="form-label">Full Name</label>
                      <input class="form-control" type="text" name="name" value="{{ session('user')->name ?? '' }}" />
                    </div>
                  </div>

                  <div class="d-grid d-sm-flex mb-3" style="width: 100%">
                    <div style="width: 100%" class="pe-0 me-3">
                      <label class="form-label">Email Address</label>
                      <input class="form-control" type="text" name="email" value="{{ session('user')->email ?? '' }}" />
                    </div>
                  </div>

                </form>

              </div>
            </div>
          </div>
          <div class="tab-pane mt-4" role="tabpanel" id="tab-2">
            <div class="card border-1 mb-3" style="
                  border-radius: 20px;
                  padding-left: 24px;
                  padding-right: 24px;
                  box-shadow: 0px 0px;
                ">
              <div class="card-body justify-content-evenly my-4">
                <div class="d-flex justify-content-between align-items-xxl-center mb-4">
                  <h5 class="fw-bold mb-0">Delivery Address</h5>
                </div>
                <div class="table-responsive" style="box-shadow: 0px 0px">
                  <table class="table table-borderless">
                    <thead>
                      <tr>
                        <th>Region</th>
                        <th>Municipality / City</th>
                        <th>Barangay</th>
                        <th>House No.</th>
                        <th>Postal Code</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      @forelse ($addresses as $address)
              <tr>
              <td>{{ $address->region }}</td>
              <td>{{ $address->municipality_city }}</td>
              <td>{{ $address->barangay }}</td>
              <td>{{ $address->house_no }}</td>
              <td>{{ $address->postal_code }}</td>
              <td class="d-flex justify-content-xxl-end">
                <!-- Edit Button -->
                <button class="btn" type="button" data-bs-toggle="modal" data-bs-target="#edit-address"
                data-address-id="{{ $address->address_id }}" data-region="{{ $address->region }}"
                data-municipality="{{ $address->municipality_city }}"
                data-barangay="{{ $address->barangay }}" data-house="{{ $address->house_no }}"
                data-postal="{{ $address->postal_code }}" onclick="fillEditModal(this)">
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
                  stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                  stroke-linejoin="round" class="icon icon-tabler icon-tabler-edit text-success"
                  style="font-size: 20px">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1"></path>
                  <path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z"></path>
                  <path d="M16 5l3 3"></path>
                </svg>
                </button>

                <!-- Delete Form Button -->
                <form method="POST" action="{{ route('address.delete', $address->address_id) }}"
                onsubmit="return confirm('Are you sure you want to delete this address?')">
                @csrf
                @method('DELETE')
                <button type="submit" class="btn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
                  stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                  stroke-linejoin="round" class="icon icon-tabler icon-tabler-trash text-danger"
                  style="font-size: 20px">
                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                  <path d="M4 7l16 0"></path>
                  <path d="M10 11l0 6"></path>
                  <path d="M14 11l0 6"></path>
                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                  </svg>
                </button>
                </form>
              </td>

              </tr>
            @empty
          <tr>
          <td colspan="7" class="text-center">No addresses found.</td>
          </tr>
        @endforelse
                    </tbody>
                  </table>
                </div>

              </div>
            </div>
            <div class="card border-1" style="
                  border-radius: 20px;
                  padding-left: 24px;
                  padding-right: 24px;
                  box-shadow: 0px 0px;
                ">
              <div class="card-body justify-content-evenly my-4">
                @php
          $regions = [
            'Region I',
            'Region II',
            'Region III',
            'Region IV-A',
            'Region IV-B',
            'Region V',
            'Region VI',
            'Region VII',
            'Region VIII',
            'Region IX',
            'Region X',
            'Region XI',
            'Region XII',
            'CAR',
            'BARMM',
            'NCR',
            'CARAGA'
          ];
          @endphp

                <form method="POST" action="{{ route('address.store') }}" class="mt-3">
                  @csrf
                  <div class="d-flex justify-content-between align-items-xxl-center mb-4">
                    <h5 class="fw-bold mb-0">Add Address</h5>
                    <button class="btn btn-outline-primary btn-lg" type="submit"
                      style="height: fit-content; width: fit-content; font-size: smaller;">
                      <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
                        stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                        stroke-linejoin="round" class="icon icon-tabler icon-tabler-checks me-2"
                        style="font-size: 18px">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <path d="M7 12l5 5l10 -10"></path>
                        <path d="M2 12l5 5m5 -5l5 -5"></path>
                      </svg>
                      Save
                    </button>
                  </div>

                  <div class="d-grid d-sm-flex mb-3" style="width: 100%">
                    <div style="width: 100%" class="pe-0 me-3 mb-3">
                      <select name="region" class="form-control">
                        <option disabled selected>-- Select Region --</option>
                        @foreach ($regions as $region)
              <option value="{{ $region }}">{{ $region }}</option>
            @endforeach
                      </select>
                    </div>
                    <div style="width: 100%">
                      <input name="municipality_city" class="form-control" type="text"
                        placeholder="Municipality / City" />
                    </div>
                  </div>

                  <div class="d-grid d-sm-flex mb-3" style="width: 100%">
                    <div style="width: 100%" class="pe-0 me-3 mb-3">
                      <input name="barangay" class="form-control" type="text" placeholder="Barangay" />
                    </div>
                    <div style="width: 100%">
                      <input name="house_no" class="form-control" type="text" placeholder="House No." />
                    </div>
                  </div>

                  <div class="d-flex mb-3" style="width: 100%">
                    <input name="postal_code" class="form-control" type="text" placeholder="Postal Code" />
                  </div>
                </form>

              </div>
            </div>
          </div>
          <div class="tab-pane mt-4 pb-0" role="tabpanel" id="tab-3">
            <div class="card border-1 mb-3" style="
                  border-radius: 20px;
                  padding-left: 24px;
                  padding-right: 24px;
                  box-shadow: 0px 0px;
                ">
              <div class="card-body justify-content-evenly my-4">
                <div class="d-flex justify-content-between align-items-xxl-center mb-4 mb-sm-5">
                  <h5 class="fw-bold mb-0">Purchase History</h5>
                </div>
                <div>
                  <ul class="nav nav-underline d-grid d-sm-flex" role="tablist">
                    <li class="nav-item" role="presentation">
                      <a class="nav-link active" role="tab" data-bs-toggle="tab" href="#tab-5">All Orders<span
                          class="badge rounded-pill bg-light ms-sm-1">{{ $orders->count() }}</span></a>
                    </li>
                    <li class="nav-item" role="presentation">
                      <a class="nav-link" role="tab" data-bs-toggle="tab" href="#tab-6">Pending<span
                          class="badge rounded-pill bg-light ms-sm-1">{{ $orders->where('status', 'Pending')->count() }}</span></a>
                    </li>
                    <li class="nav-item" role="presentation">
                      <a class="nav-link" role="tab" data-bs-toggle="tab" href="#tab-7">Packed<span
                          class="badge rounded-pill bg-light ms-sm-1">{{ $orders->where('status', 'Packed')->count() }}</span></a>
                    </li>
                    <li class="nav-item" role="presentation">
                      <a class="nav-link" role="tab" data-bs-toggle="tab" href="#tab-8">Delivered<span
                          class="badge rounded-pill bg-light ms-sm-1">{{ $orders->where('status', 'Delivered')->count() }}</span></a>
                    </li>
                    <li class="nav-item" role="presentation">
                      <a class="nav-link" role="tab" data-bs-toggle="tab" href="#tab-9">Cancelled<span
                          class="badge rounded-pill bg-light ms-sm-1">{{ $orders->where('status', 'Cancelled')->count() }}</span></a>
                    </li>
                  </ul>
                  <div class="tab-content">
                    <div class="tab-pane active mt-4" role="tabpanel" id="tab-5">
                      <div class="table-responsive" style="box-shadow: 0px 0px">
                        <!-- Table for All Orders -->
                        <table class="table">
                          <thead>
                            <tr>
                              <th class="text-capitalize fw-semibold">Order ID</th>
                              <th class="text-capitalize fw-semibold">Customer Name</th>
                              <th class="text-capitalize fw-semibold">Ordered Products</th>
                              <th class="text-capitalize fw-semibold">Quantity</th>
                              <th class="text-capitalize fw-semibold">Status</th>
                              <th class="text-capitalize fw-semibold">Total Price</th>
                              <th class="text-capitalize fw-semibold">Payment Method</th>
                              <th class="text-capitalize fw-semibold">Shipping Address</th>
                              <th class="text-capitalize fw-semibold">Delivery Date</th>
                              <th class="text-capitalize fw-semibold">Delivery Time</th>
                              <th class="text-capitalize fw-semibold">Details</th>
                            </tr>
                          </thead>
                          <tbody>
                            @foreach ($orders as $order)
                            <tr>
                              <td>{{ $order->OrderID }}</td>
                              <td>{{ $order->Name }}</td>
                              <td>{{ $order->orderedProducts }}</td>
                              <td>{{ $order->numItems }}</td>
                              <td class="fw-semibold 
                                {{ $order->status === 'Pending' ? 'text-warning' :
                ($order->status === 'Packed' ? 'text-primary' :
                  ($order->status === 'Delivered' ? 'text-success' :
                  ($order->status === 'Cancelled' ? 'text-danger' : ''))) }}">
                              {{ $order->status }}
                              </td>
                              <td>₱{{ number_format($order->TotalPrice, 2) }}</td>
                              <td>{{ $order->paymentMethod }}</td>
                              <td>{{ $order->shippingAdd }}</td>
                              <td>{{ $order->deliveryDate }}</td>
                              <td>{{ $order->deliveryTime }}</td>
                              <td>
                              <form action="{{ url('/orders/' . $order->OrderID) }}" method="POST"
                                onsubmit="return confirm('Are you sure you want to delete this order?')">
                                @csrf
                                @method('DELETE')
                                <button class="btn" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
                                  stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round"
                                  stroke-linejoin="round" class="icon icon-tabler icon-tabler-trash text-danger"
                                  style="font-size: 20px">
                                  <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                  <path d="M4 7l16 0"></path>
                                  <path d="M10 11l0 6"></path>
                                  <path d="M14 11l0 6"></path>
                                  <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                  <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                </svg>
                                </button>
                              </form>

                              </td>
                            </tr>
              @endforeach
                          </tbody>
                        </table>


                      </div>
                    </div>
                    <div class="tab-pane mt-4" role="tabpanel" id="tab-6">
                      <div class="table-responsive" style="box-shadow: 0px 0px">
                        <!-- Table for Pending Orders -->
                        <table class="table">
                          <thead>
                            <tr>
                              <th class="text-capitalize fw-semibold">Order ID</th>
                              <th class="text-capitalize fw-semibold">Customer Name</th>
                              <th class="text-capitalize fw-semibold">Ordered Products</th>
                              <th class="text-capitalize fw-semibold">Quantity</th>
                              <th class="text-capitalize fw-semibold">Status</th>
                              <th class="text-capitalize fw-semibold">Total Price</th>
                              <th class="text-capitalize fw-semibold">Payment Method</th>
                              <th class="text-capitalize fw-semibold">Shipping Address</th>
                              <th class="text-capitalize fw-semibold">Delivery Date</th>
                              <th class="text-capitalize fw-semibold">Delivery Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            @foreach ($orders->where('status', 'Pending') as $order)
                            <tr>
                              <td>{{ $order->OrderID }}</td>
                              <td>{{ $order->Name }}</td>
                              <td>{{ $order->orderedProducts }}</td>
                              <td>{{ $order->numItems }}</td>
                              <td class="fw-semibold 
                                {{ $order->status === 'Pending' ? 'text-warning' :
                ($order->status === 'Packed' ? 'text-primary' :
                  ($order->status === 'Delivered' ? 'text-success' :
                  ($order->status === 'Cancelled' ? 'text-danger' : ''))) }}">
                              {{ $order->status }}
                              </td>
                              <td>₱{{ number_format($order->TotalPrice, 2) }}</td>
                              <td>{{ $order->paymentMethod }}</td>
                              <td>{{ $order->shippingAdd }}</td>
                              <td>{{ $order->deliveryDate }}</td>
                              <td>{{ $order->deliveryTime }}</td>

                            </tr>
              @endforeach
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="tab-pane mt-4" role="tabpanel" id="tab-7">
                      <div class="table-responsive" style="box-shadow: 0px 0px">
                        <!-- Table for Packed Orders -->
                        <table class="table">
                          <thead>
                            <tr>
                              <th class="text-capitalize fw-semibold">Order ID</th>
                              <th class="text-capitalize fw-semibold">Customer Name</th>
                              <th class="text-capitalize fw-semibold">Ordered Products</th>
                              <th class="text-capitalize fw-semibold">Quantity</th>
                              <th class="text-capitalize fw-semibold">Status</th>
                              <th class="text-capitalize fw-semibold">Total Price</th>
                              <th class="text-capitalize fw-semibold">Payment Method</th>
                              <th class="text-capitalize fw-semibold">Shipping Address</th>
                              <th class="text-capitalize fw-semibold">Delivery Date</th>
                              <th class="text-capitalize fw-semibold">Delivery Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            @foreach ($orders->where('status', 'Packed') as $order)
                            <tr>
                              <td>{{ $order->OrderID }}</td>
                              <td>{{ $order->Name }}</td>
                              <td>{{ $order->orderedProducts }}</td>
                              <td>{{ $order->numItems }}</td>
                              <td class="fw-semibold 
                                {{ $order->status === 'Pending' ? 'text-warning' :
                ($order->status === 'Packed' ? 'text-primary' :
                  ($order->status === 'Delivered' ? 'text-success' :
                  ($order->status === 'Cancelled' ? 'text-danger' : ''))) }}">
                              {{ $order->status }}
                              </td>
                              <td>₱{{ number_format($order->TotalPrice, 2) }}</td>
                              <td>{{ $order->paymentMethod }}</td>
                              <td>{{ $order->shippingAdd }}</td>
                              <td>{{ $order->deliveryDate }}</td>
                              <td>{{ $order->deliveryTime }}</td>

                            </tr>
              @endforeach
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="tab-pane mt-4" role="tabpanel" id="tab-8">
                      <div class="table-responsive" style="box-shadow: 0px 0px">
                        <!-- Table for Delivered Orders -->
                        <table class="table">
                          <thead>
                            <tr>
                              <th class="text-capitalize fw-semibold">Order ID</th>
                              <th class="text-capitalize fw-semibold">Customer Name</th>
                              <th class="text-capitalize fw-semibold">Ordered Products</th>
                              <th class="text-capitalize fw-semibold">Quantity</th>
                              <th class="text-capitalize fw-semibold">Status</th>
                              <th class="text-capitalize fw-semibold">Total Price</th>
                              <th class="text-capitalize fw-semibold">Payment Method</th>
                              <th class="text-capitalize fw-semibold">Shipping Address</th>
                              <th class="text-capitalize fw-semibold">Delivery Date</th>
                              <th class="text-capitalize fw-semibold">Delivery Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            @foreach ($orders->where('status', 'Delivered') as $order)
                            <tr>
                              <td>{{ $order->OrderID }}</td>
                              <td>{{ $order->Name }}</td>
                              <td>{{ $order->orderedProducts }}</td>
                              <td>{{ $order->numItems }}</td>
                              <td class="fw-semibold 
                                {{ $order->status === 'Pending' ? 'text-warning' :
                ($order->status === 'Packed' ? 'text-primary' :
                  ($order->status === 'Delivered' ? 'text-success' :
                  ($order->status === 'Cancelled' ? 'text-danger' : ''))) }}">
                              {{ $order->status }}
                              </td>
                              <td>₱{{ number_format($order->TotalPrice, 2) }}</td>
                              <td>{{ $order->paymentMethod }}</td>
                              <td>{{ $order->shippingAdd }}</td>
                              <td>{{ $order->deliveryDate }}</td>
                              <td>{{ $order->deliveryTime }}</td>

                            </tr>
              @endforeach
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div class="tab-pane mt-4" role="tabpanel" id="tab-9">
                      <div class="table-responsive" style="box-shadow: 0px 0px">
                        <!-- Table for Cancelled Orders -->
                        <table class="table">
                          <thead>
                            <tr>
                              <th class="text-capitalize fw-semibold">Order ID</th>
                              <th class="text-capitalize fw-semibold">Customer Name</th>
                              <th class="text-capitalize fw-semibold">Ordered Products</th>
                              <th class="text-capitalize fw-semibold">Quantity</th>
                              <th class="text-capitalize fw-semibold">Status</th>
                              <th class="text-capitalize fw-semibold">Total Price</th>
                              <th class="text-capitalize fw-semibold">Payment Method</th>
                              <th class="text-capitalize fw-semibold">Shipping Address</th>
                              <th class="text-capitalize fw-semibold">Delivery Date</th>
                              <th class="text-capitalize fw-semibold">Delivery Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            @foreach ($orders->where('status', 'Cancelled') as $order)
                            <tr>
                              <td>{{ $order->OrderID }}</td>
                              <td>{{ $order->Name }}</td>
                              <td>{{ $order->orderedProducts }}</td>
                              <td>{{ $order->numItems }}</td>
                              <td class="fw-semibold 
                                {{ $order->status === 'Pending' ? 'text-warning' :
                ($order->status === 'Packed' ? 'text-primary' :
                  ($order->status === 'Delivered' ? 'text-success' :
                  ($order->status === 'Cancelled' ? 'text-danger' : ''))) }}">
                              {{ $order->status }}
                              </td>
                              <td>₱{{ number_format($order->TotalPrice, 2) }}</td>
                              <td>{{ $order->paymentMethod }}</td>
                              <td>{{ $order->shippingAdd }}</td>
                              <td>{{ $order->deliveryDate }}</td>
                              <td>{{ $order->deliveryTime }}</td>
                              <td>

                              </td>
                            </tr>
              @endforeach
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <div class="modal fade" role="dialog" tabindex="-1" id="edit-address">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Edit Address</h4>
          <button class="btn-close" type="button" aria-label="Close" data-bs-dismiss="modal"></button>
        </div>


        <div class="modal-body">
          <form id="edit-address-form" method="POST">
            @csrf
            @method('PUT')

            <input type="hidden" id="edit-address-id" name="address_id">

            <div class="d-flex mb-3">
              <input class="form-control me-2" type="text" id="edit-region" name="region" placeholder="Region" />
              <input class="form-control" type="text" id="edit-municipality" name="municipality_city"
                placeholder="Municipality/City" />
            </div>

            <div class="d-flex mb-3">
              <input class="form-control me-2" type="text" id="edit-barangay" name="barangay" placeholder="Barangay" />
              <input class="form-control" type="text" id="edit-house" name="house_no" placeholder="House No." />
            </div>

            <div class="mb-3">
              <input class="form-control" type="text" id="edit-postal" name="postal_code" placeholder="Postal Code" />
            </div>

            <div class="modal-footer">
              <button class="btn btn-light" type="button" data-bs-dismiss="modal">Close</button>
              <button class="btn btn-primary" type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
  <script src="/assets/js/script.min.js?h=fffa086275a3e9d088e0d86eca965e31"></script>
  <script>
    function fillEditModal(button) {
      // Get data attributes from the button
      const addressId = button.getAttribute("data-address-id");
      const region = button.getAttribute("data-region");
      const municipality = button.getAttribute("data-municipality");
      const barangay = button.getAttribute("data-barangay");
      const houseNo = button.getAttribute("data-house");
      const postalCode = button.getAttribute("data-postal");

      // Fill the form inputs with the current address data
      document.getElementById("edit-address-id").value = addressId;
      document.getElementById("edit-region").value = region;
      document.getElementById("edit-municipality").value = municipality;
      document.getElementById("edit-barangay").value = barangay;
      document.getElementById("edit-house").value = houseNo;
      document.getElementById("edit-postal").value = postalCode;

      // Update form action URL dynamically
      const formAction = "{{ route('address.update', ':id') }}".replace(':id', addressId);
      document.getElementById("edit-address-form").action = formAction;
    }
  </script>
  @if (session('success'))
    <div class="modal fade" id="cartSuccessModal" tabindex="-1" aria-labelledby="cartSuccessModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="cartSuccessModalLabel">Success</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        {{ session('success') }}
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <!-- Updated button to link to the cart page -->

      </div>
      </div>
    </div>
    </div>

    <script>
    // Automatically show the modal when the page loads if there is a success message
    var successModal = new bootstrap.Modal(document.getElementById('cartSuccessModal'), {
      keyboard: false
    });
    successModal.show();
    // Auto-close after 3 seconds
    setTimeout(() => {
      successModal.hide();
    }, 2000);
    </script>
  @endif

</body>

</html>