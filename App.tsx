import React, { useState, useMemo } from 'react';
import { AgeGroup, PatientProfile, AnalysisResult } from './types';
import { SYMPTOM_DATABASE } from './constants';
import SymptomSelector from './components/SymptomSelector';
import ReportView from './components/ReportView';
import { ArrowRight, User, ChevronRight, FlaskConical, Activity, ShieldCheck } from 'lucide-react';

const App: React.FC = () => {
  // State
  const [step, setStep] = useState<number>(1);
  const [ageInput, setAgeInput] = useState<string>('');
  const [isMale, setIsMale] = useState<boolean>(true);
  const [sweatTestValue, setSweatTestValue] = useState<string>('');
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);

  // Derived Age Group
  const ageGroup = useMemo((): AgeGroup => {
    const age = parseFloat(ageInput);
    if (isNaN(age)) return AgeGroup.INFANT;
    if (age < 2) return AgeGroup.INFANT;
    if (age <= 12) return AgeGroup.CHILD;
    return AgeGroup.ADOLESCENT_ADULT;
  }, [ageInput]);

  // Logic Engine
  const analyzeProfile = (): AnalysisResult => {
    const symptoms = SYMPTOM_DATABASE.filter(s => selectedSymptoms.includes(s.id));
    const sweatVal = parseFloat(sweatTestValue);
    
    let score = 0;
    let severity: AnalysisResult['severityLevel'] = 'Low';
    const recommendations: string[] = [];

    // 1. Sweat Test Logic (Definitive)
    if (!isNaN(sweatVal)) {
      if (sweatVal >= 60) {
        score = 100;
        severity = 'Critical';
        recommendations.push('Diagnostic threshold met (≥60 mmol/L). Proceed to CF care center referral.');
      } else if (sweatVal >= 30) {
        score = 75;
        severity = 'High';
        recommendations.push('Intermediate sweat chloride (30-59 mmol/L). Genetic sequencing (CFTR) strongly recommended.');
      }
    }

    // 2. Phenotype Scoring (if sweat test isn't definitive or absent)
    if (score < 100) {
      let rawScore = 0;
      let redFlags = 0;

      symptoms.forEach(s => {
        rawScore += s.weight * 10; // Arbitrary weighting multiplier
        if (s.isRedFlag) redFlags++;
      });

      // Normalize score roughly to 100 based on max possible realistic symptom count
      const calculatedProb = Math.min(Math.round(rawScore / 3), 95); 
      
      if (score === 0) score = calculatedProb; // Only use phenotype score if sweat test didn't max it out
      
      // Adjust severity based on Red Flags
      if (redFlags >= 2 || score > 70) severity = 'High';
      else if (redFlags === 1 || score > 40) severity = 'Moderate';
      else severity = 'Low';

      // Add logic-based recommendations
      if (score > 20 && isNaN(sweatVal)) {
        recommendations.push('Perform Sweat Chloride Test immediately (Gold Standard).');
      }
      if (symptoms.some(s => s.category === 'Pancreatic & GI')) {
        recommendations.push('Assess pancreatic function (fecal elastase).');
      }
      if (symptoms.some(s => s.id === 'cbavd') && isMale) {
         recommendations.push('CFTR genetic analysis recommended for CBAVD etiology.');
      }
      if (recommendations.length === 0 && score > 10) {
        recommendations.push('Monitor growth and respiratory status closely.');
      }
    }

    return {
      probabilityScore: score,
      severityLevel: severity,
      matchedSymptoms: symptoms,
      missingRedFlags: [],
      recommendations: [...new Set(recommendations)], // dedupe
      educationalContent: []
    };
  };

  const handleReset = () => {
    setStep(1);
    setAgeInput('');
    setSelectedSymptoms([]);
    setSweatTestValue('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-purple-200">
      
      {/* HERO / HEADER (Only show on input steps) */}
      {step < 3 && (
        <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-800 pb-24 pt-12 px-6 md:px-12 relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500 opacity-10 rounded-full blur-3xl -ml-10 -mb-10"></div>
          
          <div className="max-w-5xl mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">
                Cystic Fibrosis <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-purple-300">Investigator</span>
              </h1>
              <span className="text-slate-400 text-sm font-medium mt-2 md:mt-0 border border-slate-700 px-3 py-1 rounded-full">
                For Healthcare Professionals
              </span>
            </div>
            <p className="text-slate-300 max-w-2xl text-lg leading-relaxed">
              An advanced clinical decision aid utilizing phenotype-based logic to screen and recognize Cystic Fibrosis patterns across different age groups.
            </p>
          </div>
        </div>
      )}

      <main className={`max-w-5xl mx-auto px-4 md:px-8 ${step < 3 ? '-mt-16 relative z-20' : 'pt-8'}`}>
        
        {/* STEP 1: PATIENT PROFILE */}
        {step === 1 && (
          <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100 animate-fadeIn">
             <div className="flex items-center gap-3 mb-8 border-b border-slate-100 pb-4">
               <div className="bg-purple-100 p-2 rounded-lg text-purple-700">
                 <User size={24} />
               </div>
               <h2 className="text-2xl font-bold text-slate-800">Patient Profile</h2>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               
               {/* Age Input */}
               <div className="space-y-4">
                 <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Patient Age (Years)</label>
                 <input 
                    type="number" 
                    step="0.1"
                    value={ageInput}
                    onChange={(e) => setAgeInput(e.target.value)}
                    placeholder="e.g. 0.5 for 6 months, or 25"
                    className="w-full text-3xl font-light border-b-2 border-slate-200 focus:border-purple-600 outline-none py-2 bg-transparent transition-colors placeholder:text-slate-300"
                    autoFocus
                 />
                 <p className="text-sm text-slate-500">
                   Current Category: <span className="font-bold text-purple-700">{ageInput ? ageGroup : '...'}</span>
                 </p>
               </div>

               {/* Gender Input */}
               <div className="space-y-4">
                 <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider">Biological Sex</label>
                 <div className="flex gap-4">
                   <button 
                    onClick={() => setIsMale(true)}
                    className={`flex-1 py-4 rounded-xl border-2 font-medium transition-all ${isMale ? 'border-purple-600 bg-purple-50 text-purple-900' : 'border-slate-200 text-slate-500 hover:border-purple-200'}`}
                   >
                     Male
                   </button>
                   <button 
                    onClick={() => setIsMale(false)}
                    className={`flex-1 py-4 rounded-xl border-2 font-medium transition-all ${!isMale ? 'border-purple-600 bg-purple-50 text-purple-900' : 'border-slate-200 text-slate-500 hover:border-purple-200'}`}
                   >
                     Female
                   </button>
                 </div>
               </div>

               {/* Optional Sweat Test */}
               <div className="md:col-span-2 mt-4 pt-6 border-t border-slate-100">
                 <div className="flex items-start gap-4">
                    <div className="mt-1 text-teal-600 bg-teal-50 p-2 rounded-lg">
                      <FlaskConical size={20} />
                    </div>
                    <div className="flex-1">
                      <label className="block text-lg font-semibold text-slate-800 mb-2">Sweat Chloride Test Result (Optional)</label>
                      <p className="text-slate-500 text-sm mb-4">If a sweat test has already been performed, enter the chloride concentration (mmol/L).</p>
                      <input 
                        type="number" 
                        value={sweatTestValue}
                        onChange={(e) => setSweatTestValue(e.target.value)}
                        placeholder="mmol/L"
                        className="w-full md:w-1/3 p-3 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-teal-500 outline-none font-mono"
                      />
                    </div>
                 </div>
               </div>

             </div>

             <div className="mt-12 flex justify-end">
               <button 
                 disabled={!ageInput}
                 onClick={() => setStep(2)}
                 className="group bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg shadow-purple-900/20 hover:bg-purple-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3"
               >
                 Continue to Phenotype Analysis
                 <ArrowRight className="group-hover:translate-x-1 transition-transform" />
               </button>
             </div>
          </div>
        )}

        {/* STEP 2: SYMPTOM CHECKER */}
        {step === 2 && (
          <div className="space-y-6 animate-fadeIn">
            
            {/* Summary Bar */}
            <div className="bg-white rounded-2xl p-6 shadow-md flex flex-col md:flex-row justify-between items-center gap-4 border border-slate-100">
               <div className="flex items-center gap-4">
                 <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-800 font-bold text-lg">
                    {ageInput}
                 </div>
                 <div>
                   <h3 className="font-bold text-slate-800">{ageGroup}</h3>
                   <p className="text-sm text-slate-500">Select all observed clinical manifestations</p>
                 </div>
               </div>
               <button onClick={() => setStep(1)} className="text-slate-400 hover:text-slate-600 text-sm font-medium">
                 Edit Profile
               </button>
            </div>

            {/* Selector */}
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-10 border border-slate-100">
               <SymptomSelector 
                  ageGroup={ageGroup}
                  selectedIds={selectedSymptoms}
                  onToggle={(id) => {
                    if (selectedSymptoms.includes(id)) {
                      setSelectedSymptoms(selectedSymptoms.filter(s => s !== id));
                    } else {
                      setSelectedSymptoms([...selectedSymptoms, id]);
                    }
                  }}
               />

              <div className="mt-12 pt-8 border-t border-slate-100 flex justify-between items-center">
                 <div className="text-slate-500 text-sm hidden md:block">
                   {selectedSymptoms.length} symptom(s) selected
                 </div>
                 <button 
                   onClick={() => setStep(3)}
                   className="bg-gradient-to-r from-purple-700 to-teal-600 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center gap-2 ml-auto"
                 >
                   Generate Clinical Report
                   <Activity size={20} />
                 </button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: REPORT */}
        {step === 3 && (
          <ReportView 
            profile={{
              age: parseFloat(ageInput),
              isMale,
              symptoms: selectedSymptoms,
              sweatChlorideLevel: sweatTestValue ? parseFloat(sweatTestValue) : undefined
            }}
            ageGroup={ageGroup}
            result={analyzeProfile()}
            onReset={handleReset}
          />
        )}

      </main>

      {/* Footer */}
      <footer className={`py-8 text-center text-slate-400 text-sm ${step === 3 ? 'hidden print:hidden' : 'block'}`}>
        <p>© {new Date().getFullYear()} Clinical Decision Support Tool. For educational use by HCPs only.</p>
      </footer>

    </div>
  );
};

export default App;