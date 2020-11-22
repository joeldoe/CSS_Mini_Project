$(document).ready(function()
{
	$('#key1').hide();
	$('#error1').hide();
});

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

function keyLength()
{
	let plainText = document.getElementById('plaintext-box1').value;
	if(plainText == '')
	{
		return null;
	}
	else
	{
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
}

function columnarTranspositionEncrypt(plainText, key)
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

	for(let i = 0; i < ctr; i++)
	{
		let column = key.charAt(i)-1;
		for(let j = 0; j < ctr; j++)
		{
			if(columnarMatrix[j][column] != null) cipherText += columnarMatrix[j][column];
		}	
	}

	return cipherText.toUpperCase();
}

function keyRequired(value)
{

	if(value == 'caesar') 
	{
		$('#key1').show();
		$('#key1').val("Enter a key...");
	}
	else if(value == 'columnarTransposition')
	{
		keyLength = keyLength();
	
		if(keyLength == null)
		{
			$('#key1').show();
			$('#key1').val("Enter a 0 digit key...(according to the row no.)");
		}
		else
		{
			stmt = "Enter a "+keyLength+" digit key...(according to the row no.)";
			$('#key1').show();
			$('#key1').val(stmt);
		}
	}
	else
	{
		$('#key1').hide();
	}
}

function encrypt()
{
	let plainText = document.getElementById('plaintext-box1').value;
	let cipherList = document.getElementsByName('option');
	let keyCheck = document.getElementById('key1').value;
	let cipher;

	for(let i = 0; i < cipherList.length; i++)
	{
		if(cipherList[i].selected == true)
		{
			cipher = cipherList[i].value;
			break;
		}
	}

	if(cipher == '' || plainText == '' || (isNaN(keyCheck) || keyCheck == ''))
	{
		if(cipher != 'monoalphabetic')
		{
			$('#error1').show();
		}
	}
	else
	{
		switch(cipher)
		{
			case 'caesar': $('#error1').hide();
						   let key1 = document.getElementById('key1').value;
						   document.getElementById('ciphertext-box1').value = "Ciphertext: "+caesarEncrypt(plainText, key1);
						   break;
			case 'monoalphabetic': $('#error1').hide();
								   document.getElementById('ciphertext-box1').value = "Ciphertext: "+monoalphabeticEncrypt(plainText);
								   break;
			case 'columnarTransposition': $('#error1').hide();
										  let key2 = document.getElementById('key1').value;
										  let output = columnarTranspositionEncrypt(plainText,key2);
										  document.getElementById('ciphertext-box1').value = "Ciphertext: "+output;
										  break;
		}
	}
}
