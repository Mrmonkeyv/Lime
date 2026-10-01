import React from 'react';
import { Eye, ArrowRight } from 'lucide-react';

export const PanicScreen = ({ onDeactivate }) => {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-serif p-8 sm:p-12 md:p-16 select-text">
      {/* Stealth top bar resembling Google Docs / Classroom */}
      <div className="max-w-4xl mx-auto border-b border-slate-200 pb-4 mb-8 flex items-center justify-between font-sans">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
            D
          </div>
          <div>
            <h1 className="text-sm font-semibold text-slate-800">
              Biology 101: Cellular Respiration and ATP Synthesis
            </h1>
            <p className="text-xs text-slate-500">
              File · Edit · View · Insert · Format · Tools · Last edit was 2 minutes ago
            </p>
          </div>
        </div>

        <button
          onClick={onDeactivate}
          className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-sans text-slate-600 hover:text-slate-900 border border-slate-300 rounded hover:bg-slate-50 transition cursor-pointer"
          title="Return to Unblocked Arcade (Esc)"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Resume (Esc)</span>
        </button>
      </div>

      {/* Realistic academic study document */}
      <article className="max-w-3xl mx-auto space-y-6 text-slate-800 text-sm leading-relaxed">
        <h2 className="text-2xl font-bold font-sans text-slate-900 border-b pb-2">
          1. Overview of Metabolic Pathways
        </h2>
        <p>
          Cellular respiration is a set of metabolic reactions and processes that take place in the cells
          of organisms to convert biochemical energy from nutrients into adenosine triphosphate (ATP),
          and then release waste products. The reactions involved in respiration are catabolic reactions,
          which break large molecules into smaller ones, releasing energy because weak high-energy bonds,
          in particular in molecular oxygen, are replaced by stronger bonds in the products.
        </p>

        <h3 className="text-lg font-semibold font-sans text-slate-900 mt-6">
          1.1 Glycolysis
        </h3>
        <p>
          Glycolysis is a metabolic pathway that converts glucose into pyruvate, and a hydrogen ion, H+.
          The free energy released in this process is used to form the high-energy molecules ATP
          (adenosine triphosphate) and NADH (reduced nicotinamide adenine dinucleotide). Glycolysis is a sequence
          of ten enzyme-catalyzed reactions. Most monosaccharides, such as fructose and galactose, can be converted
          to one of these intermediates.
        </p>

        <div className="p-4 bg-slate-50 border border-slate-200 rounded text-xs font-mono text-slate-700">
          C6H12O6 + 2 NAD+ + 2 ADP + 2 Pi → 2 CH3COCOO− + 2 NADH + 2 ATP + 2 H2O + 2 H+
        </div>

        <h3 className="text-lg font-semibold font-sans text-slate-900 mt-6">
          1.2 The Citric Acid (Krebs) Cycle
        </h3>
        <p>
          Also known as the tricarboxylic acid cycle or Krebs cycle, this series of chemical reactions is used
          by all aerobic organisms to release stored energy through the oxidation of acetyl-CoA derived from
          carbohydrates, fats, and proteins into carbon dioxide and chemical energy in the form of ATP.
        </p>

        <div className="pt-8 border-t border-slate-200 flex justify-end font-sans">
          <button
            onClick={onDeactivate}
            className="text-xs text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Exit study mode</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </article>
    </div>
  );
};
