import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DayPlan, Itinerary, TripOverview } from 'src/app/models/trip.model';

@Component({
  selector: 'app-super-trip',
  templateUrl: './super-trip.component.html',
  styleUrls: ['./super-trip.component.css']
})
export class SuperTripComponent {
  tripForm: FormGroup;
  alertMessage: string | null = null;
  alertType: 'success' | 'error' = 'success';
  loading = false;
  showRes = false;
  
  itinerary!: Itinerary;
  trip: any = {
    name: '',
    startDate: '',
    endDate: '',
    tripOverview: {},
    budgetBreakdown: {},
    dayWiseItinerary: [],
    travelTips: []
  };

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.tripForm = this.fb.group({
      destination: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      budget: ['', [Validators.required, Validators.min(1000)]],
      travelers: ['', [Validators.required, Validators.min(1)]],
      accommodation: ['Hotel'],
      preferences: ['Adventure']
    });
  }

  generateTrip() {
    if (this.tripForm.invalid) {
      alert('Please fill in all required fields!');
      return;
    }

    const tripData = this.tripForm.value;
    const prompt = `Generate a structured trip itinerary for ${tripData.travelers} travelers  
    from ${tripData.startDate} to ${tripData.endDate} in ${tripData.destination}.  
    The budget is ${tripData.budget} INR. Accommodation: ${tripData.accommodation}.  
    Preferences: ${tripData.preferences}.  

    Follow this format strictly:  

    1. **Trip Overview**  
      - Destination:  
      - Travelers:  
      - Dates:  
      - Budget:  
      - Accommodation:  
      - Preferences:  

    2. **Budget Breakdown (Estimated)**  
      - Accommodation:  
      - Transportation:  
      - Food:  
      - Activities/Entrance Fees:  
      - Miscellaneous:  

    3. **Day-wise Itinerary** (Each day should follow this structure)  
      - **Day X: Title** (e.g., Arrival & Exploration)  
        - **Morning:**  
        - **Afternoon:**  
        - **Evening:**  

    4. **Travel Tips & Notes**  
      - Important tips about transportation, food, local customs, weather, safety, etc.`;

    const apiKey = 'AIzaSyCfOgXd7PltxeBMlQ7AtcbwaPTq-ljVKFY'; // Replace with your actual API key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    this.loading = true;
    this.http.post(apiUrl, { contents: [{ parts: [{ text: prompt }] }] }).subscribe(
      (response: any) => {
        this.loading = false;
        const apiResponse = response.candidates[0]?.content?.parts[0]?.text ?? 'No trip details generated.';
        this.itinerary = this.parseItinerary(apiResponse);
      },
      (error) => {
        this.loading = false;
        console.error('Error generating trip:', error);
        alert('Failed to generate trip. Try again later.');
      }
    );
  }

  parseItinerary(responseText: string): Itinerary {
    const itinerary: Itinerary = {
      tripOverview: {},
      budgetBreakdown: {},
      dayWiseItinerary: [],
      travelTips: []
    };
  
    const sections = responseText.split(/\n(?=\d\.)/);
  
    sections.forEach(section => {
      if (section.startsWith("1. **Trip Overview**")) {
        const overviewLines = section.split("\n").slice(1);
        overviewLines.forEach(line => {
          const match = line.match(/- (.*?):\s*(.*)/);
          if (match) {
            const key = match[1].trim().toLowerCase().replace(/\s+/g, "_") as keyof TripOverview;
            itinerary.tripOverview[key] = match[2].trim();
          }
        });
      } else if (section.startsWith("2. **Budget Breakdown (Estimated)**")) {
        const budgetLines = section.split("\n").slice(1);
        budgetLines.forEach(line => {
          const match = line.match(/- (.*?):\s*(.*)/);
          if (match) {
            itinerary.budgetBreakdown[match[1].trim().toLowerCase()] = match[2].trim();
          }
        });
      } else if (section.startsWith("3. **Day-wise Itinerary**")) {
        // Extract each day section
        const dayMatches = section.match(/- \*\*Day \d+: .*?\*\*[\s\S]*?(?=- \*\*Day \d+:|$)/g);
        
        if (dayMatches) {
          dayMatches.forEach(dayBlock => {
            // Extract day number and title
            const dayTitleMatch = dayBlock.match(/- \*\*Day (\d+): (.*?)\*\*/);
            
            if (dayTitleMatch) {
              const day: DayPlan = {
                dayNumber: parseInt(dayTitleMatch[1]),
                title: dayTitleMatch[2].trim(),
                morning: "",
                afternoon: "",
                evening: ""
              };
              
              // Extract time sections
              const morningMatch = dayBlock.match(/\*\*Morning:\*\* (.*?)(?=\*\*Afternoon:|$)/s);
              if (morningMatch) day.morning = morningMatch[1].trim();
              
              const afternoonMatch = dayBlock.match(/\*\*Afternoon:\*\* (.*?)(?=\*\*Evening:|$)/s);
              if (afternoonMatch) day.afternoon = afternoonMatch[1].trim();
              
              const eveningMatch = dayBlock.match(/\*\*Evening:\*\* (.*?)$/s);
              if (eveningMatch) day.evening = eveningMatch[1].trim();
              
              itinerary.dayWiseItinerary.push(day);
            }
          });
        }
      } else if (section.startsWith("4. **Travel Tips & Notes**")) {
        // Extract tips based on the bullet points
        const tipsMatches = section.match(/- \*\*(.*?):\*\*([\s\S]*?)(?=- \*\*|$)/g);
        
        if (tipsMatches) {
          tipsMatches.forEach(tipBlock => {
            const tipMatch = tipBlock.match(/- \*\*(.*?):\*\*([\s\S]*)/);
            if (tipMatch) {
              const tipTitle = tipMatch[1].trim();
              const tipContent = tipMatch[2].trim();
              itinerary.travelTips.push(`<strong>${tipTitle}:</strong> ${tipContent}`);
            }
          });
        }
      }
    });
  
    this.trip = {
      name: itinerary.tripOverview.destination || '',
      startDate: itinerary.tripOverview.dates?.split(" to ")[0] || '',
      endDate: itinerary.tripOverview.dates?.split(" to ")[1]?.split(" ")[0] || '',
      tripOverview: itinerary.tripOverview,
      budgetBreakdown: itinerary.budgetBreakdown,
      dayWiseItinerary: itinerary.dayWiseItinerary,
      travelTips: itinerary.travelTips
    };
  
    this.showRes = true;
    return itinerary;
  }
}
