/*
Assumptions:
* Input is valid strings of 3-char codons (does not handle e.g. 5-char string input)
*/

// Mostly to catch typos. Only implements these 7
enum Protein {
    Methionine = 'Methionine',
    Phenylalanine = 'Phenylalanine',
    Leucine = 'Leucine',
    Serine = 'Serine',
    Tyrosine = 'Tyrosine',
    Cysteine = 'Cysteine',
    Tryptophan = 'Tryptophan'
}

function translate(rna: string): Protein[] {
    let proteins: Protein[] = []

    for(let i=0; i<rna.length; i+=3) {
        //console.log(rna.slice(i,i+3))
        switch(rna.slice(i,i+3)) {
            case 'UAA':
            case 'UAG':
            case 'UGA':
                return proteins; // stop codons
            case 'AUG':
                proteins.push(Protein.Methionine);
                break;
            case 'UUU':
            case 'UUC':
                proteins.push(Protein.Phenylalanine);
                break;
            case 'UUA':
            case 'UUG':
                proteins.push(Protein.Leucine);
                break;
            case 'UCU':
            case 'UCC':
            case 'UCA':
            case 'UCG':
                proteins.push(Protein.Serine);
                break;
            case 'UAU':
            case 'UAC':
                proteins.push(Protein.Tyrosine);
                break;
            case 'UGU':
            case 'UGC':
                proteins.push(Protein.Cysteine);
                break;
            case 'UGG':
                proteins.push(Protein.Tryptophan);
                break;
            default:
                throw new Error(`Invalid/unimplemented codon: ${rna.slice(i,i+3)}`)
        }
    }
    return proteins;
}

console.clear();
let seq = translate('UGGUGUUAUUAAUGGUUU');
console.log(seq)
