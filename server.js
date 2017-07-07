var express = require("express");
var app = express();
var path    = require("path");
var cheerio = require('cheerio')

var request = require('superagent-cache')();

var http = require('http');

var cookieString = "NUELSession=aq1cgcll0qtiu2mk0pcepgpz; NUELAuth=ZCeA_RhRVLVQYm8zy1NeMA-2BqkPIdJPDqMLUTpncxvfMRVNh7yIfj6SjBFeh4iWDd07Usd1oVr7vMyHZn3GuJpD5Ex-FbBxpUrRwI3X0T2h0e4MjTH71xu1g5ldVx6EDb9w3dvu9hx4ywsnjwta2StA5DFKZOrdcS73mg_aIx0Nx5TxBtgeLKzvN3lqnWH1Dx7WrDYboUnuAXfEgRzFUKcP71W8VsLQSKedCvx2uRKAjGiQYfME11Vz4MXglzeLW6RSTokQAhZ3YzZTGEltZ2VQoXsH6WpJ9B3jdbZcdvYVkpwLd0VHeaTlAK6GKLMnhJTtp4UcOOujHHzAWO957k-rBN1FCD-z56RF8HFvEe99K9_7oaZfyTo1otL6rHp6p-A2_WPqT0NCBK9xq3x6xCvsBufVjqQaKRdk7JLBXTUamFbI_9Fdz3t8R5Y_PQ9fhTDXreYBjnEQYp3rl5v-fJGEihm7hIizmQKnprCj_XCFz-VVtWKxvIaLTWBa1PhIwcMceSCCxzgXK_hRzHgicuZDhzY8kaD0btpDmD_pwheP5d3CpR3QRh-4fwzWmnlzh2Wk1yv-XCgp-V0S9KlmFYsszKkeL3QrhhgvU2BFYua3bf6ygBsrUTg88bnoGfNyCVbu7O1UweduxFyebDCPEPfsFLTJZ_fdmeZ8rqaPQ-E6R0EdCBtPaVmQ_iatafScT305BOOdjVxKs1tXK5952nMMXxu2glk2NsXoE9B9CmJ1DDG98gpoyaw767jaJmzbg8FRTZIu39EjzhpFgM2Oam0IZ3UnMoWf22FcB0oP0qR7O54J6l1csxOnElxqeZ054iRUIendo_YMaKwJ4ERNN9TpaLupEgHtXwu29nFF9-Oc5PgJAmfd_w2utd1a2ofzlaZ_AGIqJjI7P_CSpi3_I28fbjUzrwThi3Adgl-7HSMyONprhZt7xb3rGngbfamqw7JGhyZSE0u-LNiE_cwYF6Y-PoaR9XadezD1MmPbv8B0NgGM8H9KDoz08oZJqfC9xiLEtrsIBDWPQENbZuiMulVHDDiS1ILn4hYBspQasQXPOF4SHfehbNfKFWHylxEPXyuLZNuAdinsnM5pJ-DRTrdoVDtNI6-a6piS3sSYPRy9AoT8N9DlIVNLtptkoBU9tlWbr4GDDmKwaTv9NIcT8BTjqLwfds50SLSijnL32oovm1jFXp2ReUohTRA5JgbciWhftehqhXthaxHVp9TnrpxPWL-8HEOARtx7mdiinh31ddVgblCaGwh2Ykhj3EEwdJwEexJC9DrH4il01rz_gHwHv3ymcHrpo_R3aC_OT0SHk_yDSboM3V1LEkIHQUxt6hBVj-1Ue1bFcfrCoufXI4fpacQa9wYbe9GPlzSC-Aya6za2t6iP7UB_PSKZlc00;"

app.use(express.static(__dirname + '/static'));

app.get('/summoner/:summoner', function(req, res) {
	res.sendFile(path.join(__dirname + '/pages/singlesummoner.html'));
});

app.get('/summoner', function(req, res) {
	res.sendFile(path.join(__dirname + '/pages/missingsummoner.html'));
});

app.get('/university/:university', function(req, res) {
	res.sendFile(path.join(__dirname + '/pages/universitysummoner.html'));
});

app.get('/university', function(req, res) {
	res.sendFile(path.join(__dirname + '/pages/missinguniversity.html'));
});

app.get('/error', function(req, res) {
	res.sendFile(path.join(__dirname + '/pages/error.html'));
});

require('./routes')(app);

app.listen('8080', function() {
	console.log("Server Running...");


    var url = "http://localhost:8080/summoner:kakakwj";
    var cookieStringNew = "NUELSession=gpcyoviyzmcbcv3es0mycd1r; ARRAffinity=f02c8a40711ffa249ac8dcf17e82c47021b4939e86cdd8caa8a1729b4a81838d; NUELAuth=LmUN24DZwEEVq60y4rMPDgYpG5tb_j89lutdmg97B_UUMX-C3FJ8w9IoU_adZvlGkh3ucqHUOJLTVVEQZ3sFZCAVFDa69OSbiLqWN4tDvA1aPLRAweY0-Uim4Z8EW_cdQzF0bPNdaK2Q02xeqg4SV6dqiujg8RVgS81LlxtPw9Ojn6mB3ZTNTw7Ugmfba1mbB_KPdObciGezxboQIMuCIAg5vbqbLzlTgIXKkdnDWVVzUj4rutYYvN7SYT6GpRbWUgPJakqknSfN8NWGRAVgbZ4tKjgWm-SknAqJ66vZpzthF6drfJn8XlDdlH9YZWkUs9WhA63aP2hqsecmvUEdE8qLnGQjpcsZQ6ozMYTZRvK-0J5vjsAEmITXu0ES1bUMzVbK8wiYQdVTAOTYKcSVtBe7LZI3zzZiocEuL_vUART4_JgI5jtBAL1QO0hAipvhuaIWO56Gx3y650kbnqGKjGdK6MU96OiMP0RvtWp1fLlshNeqTrMcdZOuTlA1Ai6T-00SZB-n1xNzweoBKS6yuybYXDm4cWdPwpAMXj4-qzd2NEbdO_IauNPWllC8UCE_5gv8D6wlKRQLTStrlXCkMcG4jTPCpuQOSlKdQx1x0POEI0AOvrU2SG7B4BCfPbbl91QiNdppmUm51-_RHlMp4udQeCbgiaMm4WJERc2icZQiiv59-XxXdAkQ7NHbKG2niYzachP2G1N97K8o5RCCPR36sVJVfSzZqXqM3DT0Hvf88YoOdbp2B1EeqTZXOky07hLCmov03511IBu70B-qJpvEHtQYthGcbnC7oBz030EOcuU9IyegOpjpInVwrCXZ1SLFEYECFj-mSBMkghMBPHLwZPy43i6yK-8vcgm2KjdIPF2EzybWtxDeAUMv5oZPLNEkO_VNSW5mlpZskhB6Ph3uNqXatYn80ksXXkqtuI2p-Q-4WiIDEkBk1zKAfeuM282-XmP3EkRPL37ZZJRSmxngoxLjs4cyQNbWFp0KlgnrFMDXNro9vY1tCejx3Tlivx743L1QjxuEdSeqp-n7cuA4aLRzYgnXM05tXrTqkCPvp-Fu0_KWxbxnZHIliDaHImdMKYxHK-b9lyrQkrVZvnfLHT0Tf3wj1-_wGNEPKLID3AhS2y_8nFOUzKIT_Vk2Jj07AB0M2-zgjrw0j9HnOcrL4jwL1u4X2xP-LghKsWQ_ic6ie-5LYZRNuzR1JciClLePYNSQ1Wr71k5iozL8eS23IbjXc0UBqTc1njM_qmn6yK3yS2wMZTzc_o5UZ3uJVU299z0tKoriQo7z2uuxjAfitePnf-vC4yd8PDqx-H90LEIljQHCQsJDZ1-HjRjdKeRtV0-aluty3PprjWTa5kDJ1xxumAogkNJxppFfcZI; _ga=GA1.2.592576149.1458220828; _gat=1";
    
    request
    .get(url)
    .set("Cookie", cookieString)
    .end(function(err, res) {
        console.log(err);
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log(res);
    });
});