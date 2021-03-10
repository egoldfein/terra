// Code generated by counterfeiter. DO NOT EDIT.
package treflefakes

import (
	"context"
	"sync"

	"github.com/egoldfein/terra/internal/trefle"
)

type FakeTrefle struct {
	GetPlantStub        func(context.Context, string) (*trefle.Plant, error)
	getPlantMutex       sync.RWMutex
	getPlantArgsForCall []struct {
		arg1 context.Context
		arg2 string
	}
	getPlantReturns struct {
		result1 *trefle.Plant
		result2 error
	}
	getPlantReturnsOnCall map[int]struct {
		result1 *trefle.Plant
		result2 error
	}
	SearchPlantsStub        func(context.Context, *string, *string, *string) ([]trefle.Plant, error)
	searchPlantsMutex       sync.RWMutex
	searchPlantsArgsForCall []struct {
		arg1 context.Context
		arg2 *string
		arg3 *string
		arg4 *string
	}
	searchPlantsReturns struct {
		result1 []trefle.Plant
		result2 error
	}
	searchPlantsReturnsOnCall map[int]struct {
		result1 []trefle.Plant
		result2 error
	}
	invocations      map[string][][]interface{}
	invocationsMutex sync.RWMutex
}

func (fake *FakeTrefle) GetPlant(arg1 context.Context, arg2 string) (*trefle.Plant, error) {
	fake.getPlantMutex.Lock()
	ret, specificReturn := fake.getPlantReturnsOnCall[len(fake.getPlantArgsForCall)]
	fake.getPlantArgsForCall = append(fake.getPlantArgsForCall, struct {
		arg1 context.Context
		arg2 string
	}{arg1, arg2})
	stub := fake.GetPlantStub
	fakeReturns := fake.getPlantReturns
	fake.recordInvocation("GetPlant", []interface{}{arg1, arg2})
	fake.getPlantMutex.Unlock()
	if stub != nil {
		return stub(arg1, arg2)
	}
	if specificReturn {
		return ret.result1, ret.result2
	}
	return fakeReturns.result1, fakeReturns.result2
}

func (fake *FakeTrefle) GetPlantCallCount() int {
	fake.getPlantMutex.RLock()
	defer fake.getPlantMutex.RUnlock()
	return len(fake.getPlantArgsForCall)
}

func (fake *FakeTrefle) GetPlantCalls(stub func(context.Context, string) (*trefle.Plant, error)) {
	fake.getPlantMutex.Lock()
	defer fake.getPlantMutex.Unlock()
	fake.GetPlantStub = stub
}

func (fake *FakeTrefle) GetPlantArgsForCall(i int) (context.Context, string) {
	fake.getPlantMutex.RLock()
	defer fake.getPlantMutex.RUnlock()
	argsForCall := fake.getPlantArgsForCall[i]
	return argsForCall.arg1, argsForCall.arg2
}

func (fake *FakeTrefle) GetPlantReturns(result1 *trefle.Plant, result2 error) {
	fake.getPlantMutex.Lock()
	defer fake.getPlantMutex.Unlock()
	fake.GetPlantStub = nil
	fake.getPlantReturns = struct {
		result1 *trefle.Plant
		result2 error
	}{result1, result2}
}

func (fake *FakeTrefle) GetPlantReturnsOnCall(i int, result1 *trefle.Plant, result2 error) {
	fake.getPlantMutex.Lock()
	defer fake.getPlantMutex.Unlock()
	fake.GetPlantStub = nil
	if fake.getPlantReturnsOnCall == nil {
		fake.getPlantReturnsOnCall = make(map[int]struct {
			result1 *trefle.Plant
			result2 error
		})
	}
	fake.getPlantReturnsOnCall[i] = struct {
		result1 *trefle.Plant
		result2 error
	}{result1, result2}
}

func (fake *FakeTrefle) SearchPlants(arg1 context.Context, arg2 *string, arg3 *string, arg4 *string) ([]trefle.Plant, error) {
	fake.searchPlantsMutex.Lock()
	ret, specificReturn := fake.searchPlantsReturnsOnCall[len(fake.searchPlantsArgsForCall)]
	fake.searchPlantsArgsForCall = append(fake.searchPlantsArgsForCall, struct {
		arg1 context.Context
		arg2 *string
		arg3 *string
		arg4 *string
	}{arg1, arg2, arg3, arg4})
	stub := fake.SearchPlantsStub
	fakeReturns := fake.searchPlantsReturns
	fake.recordInvocation("SearchPlants", []interface{}{arg1, arg2, arg3, arg4})
	fake.searchPlantsMutex.Unlock()
	if stub != nil {
		return stub(arg1, arg2, arg3, arg4)
	}
	if specificReturn {
		return ret.result1, ret.result2
	}
	return fakeReturns.result1, fakeReturns.result2
}

func (fake *FakeTrefle) SearchPlantsCallCount() int {
	fake.searchPlantsMutex.RLock()
	defer fake.searchPlantsMutex.RUnlock()
	return len(fake.searchPlantsArgsForCall)
}

func (fake *FakeTrefle) SearchPlantsCalls(stub func(context.Context, *string, *string, *string) ([]trefle.Plant, error)) {
	fake.searchPlantsMutex.Lock()
	defer fake.searchPlantsMutex.Unlock()
	fake.SearchPlantsStub = stub
}

func (fake *FakeTrefle) SearchPlantsArgsForCall(i int) (context.Context, *string, *string, *string) {
	fake.searchPlantsMutex.RLock()
	defer fake.searchPlantsMutex.RUnlock()
	argsForCall := fake.searchPlantsArgsForCall[i]
	return argsForCall.arg1, argsForCall.arg2, argsForCall.arg3, argsForCall.arg4
}

func (fake *FakeTrefle) SearchPlantsReturns(result1 []trefle.Plant, result2 error) {
	fake.searchPlantsMutex.Lock()
	defer fake.searchPlantsMutex.Unlock()
	fake.SearchPlantsStub = nil
	fake.searchPlantsReturns = struct {
		result1 []trefle.Plant
		result2 error
	}{result1, result2}
}

func (fake *FakeTrefle) SearchPlantsReturnsOnCall(i int, result1 []trefle.Plant, result2 error) {
	fake.searchPlantsMutex.Lock()
	defer fake.searchPlantsMutex.Unlock()
	fake.SearchPlantsStub = nil
	if fake.searchPlantsReturnsOnCall == nil {
		fake.searchPlantsReturnsOnCall = make(map[int]struct {
			result1 []trefle.Plant
			result2 error
		})
	}
	fake.searchPlantsReturnsOnCall[i] = struct {
		result1 []trefle.Plant
		result2 error
	}{result1, result2}
}

func (fake *FakeTrefle) Invocations() map[string][][]interface{} {
	fake.invocationsMutex.RLock()
	defer fake.invocationsMutex.RUnlock()
	fake.getPlantMutex.RLock()
	defer fake.getPlantMutex.RUnlock()
	fake.searchPlantsMutex.RLock()
	defer fake.searchPlantsMutex.RUnlock()
	copiedInvocations := map[string][][]interface{}{}
	for key, value := range fake.invocations {
		copiedInvocations[key] = value
	}
	return copiedInvocations
}

func (fake *FakeTrefle) recordInvocation(key string, args []interface{}) {
	fake.invocationsMutex.Lock()
	defer fake.invocationsMutex.Unlock()
	if fake.invocations == nil {
		fake.invocations = map[string][][]interface{}{}
	}
	if fake.invocations[key] == nil {
		fake.invocations[key] = [][]interface{}{}
	}
	fake.invocations[key] = append(fake.invocations[key], args)
}

var _ trefle.Trefle = new(FakeTrefle)
