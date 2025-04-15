<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Address;
use Illuminate\Validation\Rule;
use App\Models\GenUser;

class UserProfileController extends Controller
{
    // Store address
    public function store(Request $request)
    {
        $request->validate([
            'region' => ['required', Rule::in([
                'Region I', 'Region II', 'Region III', 'Region IV-A', 'Region IV-B',
                'Region V', 'Region VI', 'Region VII', 'Region VIII',
                'Region IX', 'Region X', 'Region XI', 'Region XII',
                'CAR', 'BARMM', 'NCR', 'CARAGA'
            ])],
            'municipality_city' => 'required|string|max:255',
            'barangay' => 'required|string|max:255',
            'house_no' => 'required|string|max:255',
            'postal_code' => 'required|string|max:10',
        ]);

        $user = session('user'); // Assuming you're storing user in session

        Address::create([
            'user_id' => $user->id,
            'region' => $request->region,
            'municipality_city' => $request->municipality_city,
            'barangay' => $request->barangay,
            'house_no' => $request->house_no,
            'postal_code' => $request->postal_code,
        ]);

        return redirect()->back()->with('success', 'Address saved!');
    }

    // Show address method
    public function showAddress()
    {
        // Fetch the user from the session
        $user = session('user'); // You can also use auth()->user() if you're using authentication
        $addresses = Address::where('user_id', $user->id)->get();

        $regions = [
            'Region I', 'Region II', 'Region III', 'Region IV-A', 'Region IV-B',
            'Region V', 'Region VI', 'Region VII', 'Region VIII',
            'Region IX', 'Region X', 'Region XI', 'Region XII',
            'CAR', 'BARMM', 'NCR', 'CARAGA'
        ];

        // Pass the user, addresses, and regions to the view
        return view('profile', compact('user', 'addresses', 'regions'));
    }

    // Method to delete an address
    public function delete(Request $request, $id)
    {
        $user = session('user');
    
        $address = Address::where('address_id', $id)->firstOrFail();
    
        if ($address->user_id !== $user->id) {
            return redirect()->route('profile')->with('error', 'Unauthorized access to address.');
        }
    
        $address->delete();
    
        return redirect()->route('profile')->with('success', 'Address deleted!');
    }
    
    public function update(Request $request, $id)
    {
        $request->validate([
            'region' => 'required|string|max:255',
            'municipality_city' => 'required|string|max:255',
            'barangay' => 'required|string|max:255',
            'house_no' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
        ]);

        $address = Address::findOrFail($id);

        $address->update([
            'region' => $request->region,
            'municipality_city' => $request->municipality_city,
            'barangay' => $request->barangay,
            'house_no' => $request->house_no,
            'postal_code' => $request->postal_code,
        ]);

        return redirect()->route('profile')->with('success', 'Address updated successfully!');
    }

    public function updateProfile(Request $request)
    {
        // Get the user ID stored in the session
        $sessionUser = session('user');
    
        $user = GenUser::find($sessionUser->id);
    
        // Validate the request
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:gen_users,email,' . $user->id,
        ]);
    
        // Update the user's details
        $user->update([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
        ]);
    
        // Update the session with the latest user data
        session(['user' => $user]);
    
        session()->flash('success', 'Profile updated successfully!');
    
        return redirect()->back();
    }
    
    
    
    
    
    
    
}
