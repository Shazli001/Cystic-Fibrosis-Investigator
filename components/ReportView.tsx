import React from 'react';
import { AnalysisResult, PatientProfile, AgeGroup } from '../types';
import { EDUCATIONAL_CONTENT } from '../constants';
import { AlertTriangle, Stethoscope, BookOpen, Activity } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

interface Props {
  profile: PatientProfile;
  result: AnalysisResult;
  ageGroup: AgeGroup;
  onReset: () => void;
}

const ReportView: React.FC<Props> = ({ profile, result, ageGroup, onReset }) => {
  
  const getSeverityColor = (level: string) => {
    switch (level) {
      case 'Critical': return 'text-red-600 bg-red-50 border-red-200';
      case 'High': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'Moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-green-600 bg-green-50 border-green-200';
    }
  };

  const chartData = [
    { name: 'Risk', value: result.probabilityScore },
    { name: 'Safe', value: 100 - result.probabilityScore }
  ];

  const COLORS = result.probabilityScore > 60 ? ['#dc2626', '#e2e8f0'] : result.probabilityScore > 30 ? ['#d97706', '#e2e8f0'] : ['#059669', '#e2e8f0'];

  return (
    <div className="max-w-5xl mx-auto animate-fadeIn pb-20">
      
      {/* Sticky Header for Actions */}
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-200 p-4 flex justify-between items-center rounded-b-xl shadow-sm mb-6 md:mb-8">
        <h2 className="text-lg md:text-xl font-bold text-slate-800 truncate mr-4">Investigation Results</h2>
        <button onClick={onReset} className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors text-sm md:text-base whitespace-nowrap">
          New Patient
        </button>
      </div>

      {/* Content */}
      <div className="bg-white p-6 md:p-12 shadow-xl rounded-3xl border border-slate-100" id="report-content">
        
        {/* Report Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b-2 border-purple-900 pb-6 mb-8 gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-purple-900 mb-2">Cystic Fibrosis Investigation Report</h1>
            <p className="text-slate-500 text-sm md:text-base">Generated for clinical review | {new Date().toLocaleDateString()}</p>
          </div>
          <div className="text-left md:text-right w-full md:w-auto bg-slate-50 md:bg-transparent p-4 md:p-0 rounded-xl">
            <div className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Patient Profile</div>
            <div className="text-lg font-medium text-slate-800">{profile.age} years • {profile.isMale ? 'Male' : 'Female'}</div>
            <div className="text-purple-600 font-medium">{ageGroup}</div>
          </div>
        </div>

        {/* Executive Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-10">
          
          {/* Risk Score Card */}
          <div className="col-span-1 bg-slate-50 rounded-2xl p-6 flex flex-col items-center justify-center border border-slate-200 relative overflow-hidden min-h-[250px]">
             <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest absolute top-4 left-4">Phenotype Risk</h3>
             <div className="h-40 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={60}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                    >
                      {chartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
             </div>
             <div className="absolute inset-0 flex items-center justify-center flex-col mt-4">
               <span className="text-3xl md:text-4xl font-black text-slate-800">{result.probabilityScore}%</span>
               <span className={`text-xs font-bold px-2 py-1 rounded mt-1 uppercase ${getSeverityColor(result.severityLevel).split(' ')[0]}`}>{result.severityLevel} Suspicion</span>
             </div>
          </div>

          {/* Recommendations Card */}
          <div className="col-span-1 md:col-span-2 bg-purple-50 rounded-2xl p-6 border border-purple-100">
            <h3 className="text-sm font-bold text-purple-800 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity size={16} /> Recommended Actions
            </h3>
            <ul className="space-y-3">
              {result.recommendations.map((rec, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-white p-3 rounded-lg shadow-sm border border-purple-100">
                  <span className="bg-purple-100 text-purple-700 rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 font-bold text-xs mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="text-slate-700 font-medium text-sm md:text-base">{rec}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Observed Clinical Manifestations */}
        <div className="mb-10">
          <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Stethoscope className="text-teal-600" /> Observed Clinical Manifestations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {result.matchedSymptoms.length > 0 ? (
              result.matchedSymptoms.map(symptom => (
                <div key={symptom.id} className="border border-slate-200 rounded-xl p-4 flex flex-col gap-2 bg-white">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-slate-800">{symptom.label}</span>
                    <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded whitespace-nowrap ml-2">
                      {symptom.category}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed">{symptom.description}</p>
                </div>
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 p-6 text-center bg-slate-50 rounded-xl text-slate-500 italic">
                No specific CF-associated phenotypes selected.
              </div>
            )}
          </div>
        </div>

        {/* Diagnostic Guidelines */}
        <div className="mb-10">
           <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-20 -mt-20 pointer-events-none"></div>
              <h3 className="text-lg md:text-xl font-bold mb-6 flex items-center gap-2">
                <AlertTriangle className="text-yellow-400" /> Diagnostic Criteria & Guidelines
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-slate-200 mb-2">Sweat Chloride Interpretation</h4>
                  <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                    <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-slate-200">
                      {EDUCATIONAL_CONTENT.SWEAT_CHLORIDE_GUIDE}
                    </pre>
                  </div>
                </div>
                <div>
                   <h4 className="font-semibold text-slate-200 mb-2">Standard of Diagnosis</h4>
                   <p className="text-sm text-slate-300 leading-relaxed mb-4">
                     According to the Cystic Fibrosis Foundation Consensus Guidelines, diagnosis requires clinical presentation (phenotype) combined with evidence of CFTR dysfunction (sweat test or genetic analysis).
                   </p>
                   <div className="text-xs text-slate-400 border-t border-white/10 pt-2">
                     Ref: Farrell PM, et al. J Pediatr. 2017
                   </div>
                </div>
              </div>
           </div>
        </div>

        {/* Educational Context: Progression */}
        <div className="mb-8">
           <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <BookOpen className="text-blue-600" /> Understanding CF Progression
          </h3>
           
           <div className="border-l-4 border-blue-500 pl-4 md:pl-6 py-2 mb-6 bg-blue-50 rounded-r-xl">
             <h4 className="font-bold text-blue-900 mb-1">The Importance of Early Management</h4>
             <p className="text-blue-800 text-sm leading-relaxed">{EDUCATIONAL_CONTENT.EARLY_IMPACT}</p>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:gap-4">
              <div className="p-4 bg-pink-50 rounded-xl md:rounded-r-none border-l-4 border-pink-400 mb-4 md:mb-0">
                 <h4 className="font-bold text-pink-900 mb-2 text-sm uppercase tracking-wider">Infancy</h4>
                 <ul className="text-xs text-pink-800 space-y-1 list-disc list-inside">
                   <li>Lung infection & inflammation</li>
                   <li>Meconium ileus</li>
                   <li>Pancreatic insufficiency</li>
                   <li>Obstructed pancreatic ducts</li>
                 </ul>
              </div>
              <div className="p-4 bg-indigo-50 border-l-4 border-indigo-400 mb-4 md:mb-0">
                 <h4 className="font-bold text-indigo-900 mb-2 text-sm uppercase tracking-wider">Childhood</h4>
                 <ul className="text-xs text-indigo-800 space-y-1 list-disc list-inside">
                   <li>ABPA (Fungal reaction)</li>
                   <li>Chronic Pancreatitis</li>
                   <li>Liver Disease</li>
                   <li>Distal Intestinal Obstruction</li>
                 </ul>
              </div>
              <div className="p-4 bg-slate-100 rounded-xl md:rounded-l-none border-l-4 border-slate-400">
                 <h4 className="font-bold text-slate-900 mb-2 text-sm uppercase tracking-wider">Adulthood</h4>
                 <ul className="text-xs text-slate-800 space-y-1 list-disc list-inside">
                   <li>Advanced Lung Damage</li>
                   <li>CF-Related Diabetes</li>
                   <li>Liver Failure / Cirrhosis</li>
                   <li>Fertility Issues (CBAVD)</li>
                 </ul>
              </div>
           </div>
        </div>
        
        <div className="mt-12 pt-6 border-t border-slate-200 text-center">
           <p className="text-xs text-slate-400">
             This report is a clinical support aid and does not replace professional medical diagnosis.
           </p>
        </div>

      </div>
    </div>
  );
};

export default ReportView;