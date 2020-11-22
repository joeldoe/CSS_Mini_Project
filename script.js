function caesarEncrypt(plainText, key)
{
	let cipherText = "";
	let cipher = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let pt = plainText.toUpperCase();
	
	for(let i = 0; i < pt.length; i++)
	{
		if(pt.charAt(i) === " ")
		{
			cipherText = cipherText + " ";
		}
		else if(isNaN(pt.charAt(i)))
		{
			for(let j = 0; j < cipher.length; j++)
			{
				if(pt.charAt(i) === cipher.charAt(j))
				{
					if((j+key) >= cipher.length)
					{
						let shift = (j+key) % cipher.length;
						cipherText = cipherText + cipher.charAt(shift);
					}
					else
					{
						cipherText = cipherText + cipher.charAt(j+key);
					}
				}
			}
		}
		else
		{
			cipherText = cipherText + pt.charAt(i);
		}
	}
	
	return cipherText;
}

function caesarDecrypt(cipherText, key)
{
	let plainText = "";
	let cipher = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let ct = cipherText;
	
	for(let i = 0; i < ct.length; i++)
	{
		if(ct.charAt(i) === " ")
		{
			plainText = plainText + " ";
		}
		else if(isNaN(ct.charAt(i)))
		{
			for(let j = 0; j < cipher.length; j++)
			{
				if(ct.charAt(i) === cipher.charAt(j))
				{
					if((j-key) < 0)
					{
						let shift =  cipher.length + (j-key);
						plainText = plainText + cipher.charAt(shift);
					}
					else
					{
						plainText = plainText + cipher.charAt(j-key);
					}
				}
			}
		}
		else
		{
			plainText = plainText + ct.charAt(i);
		}
	}
	
	return plainText.toLowerCase();
}

function monoalphabeticEncrypt(plainText)
{
	let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let cipher = "AMIKOPQRSTUVWXYZBCDEFGHJLN";
	let cipherText = "";
	plainText = plainText.toUpperCase();

	for(let i = 0; i < plainText.length; i++)
	{
		if(plainText.charAt(i) == " ")
		{
			cipherText += " ";
		}
		else if(isNaN(plainText.charAt(i)))
		{
			for(let j = 0; j < alphabets.length; j++)
			{
				
				if(plainText.charAt(i) == alphabets.charAt(j))
				{
					cipherText += cipher.charAt(j);
				}
			}
		}
		else
		{
			cipherText += plainText.charAt(i);
		}
	}
	return cipherText;
}

function monoalphabeticDecrypt(cipherText)
{
	let plainText = "";
	let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	let cipher = "AMIKOPQRSTUVWXYZBCDEFGHJLN";
	
	for(let i = 0; i < cipherText.length; i++)
	{
		if(cipherText.charAt(i) == " ")
		{
			plainText += " ";
		}
		else if(isNaN(cipherText.charAt(i)))
		{
			for(let j = 0; j < cipher.length; j++)
			{
				if(cipherText.charAt(i) == cipher.charAt(j))
				{
					plainText += alphabets.charAt(j);
				}
			}
		}
		else
		{
			plainText += cipherText.charAt(i);
		}
	}
	return plainText.toLowerCase();
}

function keylessTranspositionEncrypt(plainText)
{
	let cipherText = "";
	let firstPartLength
	let secondPartLength;
	let firstPart = "";
	let secondPart = "";

	let pt = plainText.split(" ").join("");
	let lengthOfPlaintext = plainText.length;
	
	try{


	if(lengthOfPlaintext % 2 == 0)
	{
		firstPartLength = lengthOfPlaintext / 2;
		secondPartLength = lengthOfPlaintext / 2;
	}
	else
	{
		firstPartLength = Math.ceil(lengthOfPlaintext / 2);
		secondPartLength = Math.floor(lengthOfPlaintext / 2);
	}

	for(let i = 0; i < firstPartLength; i+2)
	{
		firstPart += pt.charAt(i);
	}

	for(let i = 1; i < secondPartLength; i+2)
	{
		secondPart += pt.charAt(i);
	}

	cipherText = firstPart + secondPart;
	}
	catch(e)
	{
		console.log(e.message);
	}
	return cipherText;
}

function keyLength()
{
	let plainText = document.getElementById('plaintext-box1').value;
	let pt = plainText.split(" ").join("");
	let lengthOfPlaintext = pt.length;
	let ctr = 1;
	while(true)
	{
		if(Math.pow(ctr,2) >= lengthOfPlaintext) break;
		else ctr++;
	}
	return ctr;
}

function columnarTranspositionEncrypt(plainText)
{
	let cipherText = "";
	let pt = plainText.split(" ").join("");
	let lengthOfPlaintext = pt.length;
	let ctr = 1;
	while(true)
	{
		if(Math.pow(ctr,2) >= lengthOfPlaintext) break;
		else ctr++;
	}

	let columnarMatrix = [];
	let index = 0;
	
	for(let i = 0; i < ctr; i++)
	{
		let row = [];
		for(let j = 0; j < ctr; j++)
		{
			if(index >= lengthOfPlaintext)
			{
				row.push(null);
			}
			else
			{
				row.push(pt.charAt(index));
			}
			index++;
		}
		columnarMatrix.push(row);
	}
	
	let keyOptions = []
	for(let i = 1; i <= ctr; i++)
	{
		keyOptions.push(i);
	}

	// Key Generation
	let key = "";
	while(true)
	{
		let element = Math.ceil(Math.random() * ctr);
		let index = keyOptions.indexOf(element);
		if(index !== -1)
		{
			let b = keyOptions.splice(index, 1);
			key += element;
		}

		if(key.length == ctr) break;
	}

	for(let i = 0; i < ctr; i++)
	{
		let column = key.charAt(i)-1;
		for(let j = 0; j < ctr; j++)
		{
			if(columnarMatrix[j][column] != null) cipherText += columnarMatrix[j][column];
		}	
	}
	
	let returnValues = [];
	returnValues.push(cipherText.toUpperCase());
	returnValues.push(key);
	return returnValues;
}

console.log(keylessTranspositionEncrypt("Toh kaise hai aap log!"));

function keyRequired()
{
	if(this.value == 'caesar') 
	{
		document.getElementById('key1').style.display = 'block';
		document.getElementById('key1').value = 'Enter a key...'
	}
	else if(this.value == 'columnarTransposition')
	{
		keyLength = keyLength();
		document.getElementById('key1').style.display = 'block';
		document.getElementById('key1').value = 'Enter '+keyLength+' digit key...(according to the row no.)';
	}
	else
	{
		document.getElementById('key1').style.display = 'none';
	}
}

function encrypt()
{

}

$(document).ready(function()
{
	document.getElementById('key1').style.display = 'none';
	document.getElementById('key2').style.display = 'none';
	$('#year').text(new Date().getFullYear());
});
/*
let matrix = Math.matrix;
let papa = 'mamma';
//matrix = [2][2];

matrix = [[1,papa],[5,3]];
matrix[1][0] = 10;
console.log(matrix[1][0]);
console.log(matrix);

//console.log();
let enc = caesarEncrypt("joeleldoe and ayushsharma went to a Military Academy, they had always dreamt for. They worked hard alot and achieved their goals.",15);
console.log(enc);
console.log(caesarDecrypt(enc,15));
/*
let string = " Hello all of u ! ";
console.log(string);
console.log(string.split(" ").join(""));*/
